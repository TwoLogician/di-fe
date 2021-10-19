import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"
import { AppService } from "src/app/app.service"

import { CoinInfo } from "src/app/models"
import { BaseComponent } from "../base.component"

@Component({
    selector: "coin",
    templateUrl: "./coin.component.html",
})
export class CoinComponent extends BaseComponent implements OnInit {

    bnb = ""
    bnbValue = ""
    coin = new CoinInfo()
    coins: CoinInfo[] = []
    display = false
    items: MenuItem[] = []
    selectedData = new CoinInfo()
    totalValue = ""

    constructor(private service: AppService) {
        super()
    }

    add() {
        this.coin = new CoinInfo()
        this.display = true
    }

    async delete(e: CoinInfo) {
        try {
            if (!confirm("Are you sure?")) {
                return
            }
            this.setProcessing(true)
            await this.service.deleteCoin(e.id)
            this.coins = this.coins.filter(x => x.id != e.id)
            this.setProcessing(false)
        } catch (err) {
            this.error(err)
        }
    }

    edit(e: CoinInfo) {
        let { ...coin } = e
        this.coin = coin
        this.display = true
    }

    async initBnb() {
        let rs = await this.service.bscscan.getBalance()
        let bnb = Number.parseFloat(rs.result) / 1000000000000000000
        let token = await this.service.pancake.getToken("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c")
        let bnbPrice = Number.parseFloat(token.data.price)
        let bnbValue = bnbPrice * bnb
        this.bnb = this.toNumberString(bnb)
        this.bnbValue = this.toNumberString(bnbValue)
    }

    async initBalances() {
        let totalValue = 0
        for (let c of this.coins) {
            try {
                let rs = await this.service.bscscan.getTokenBalance(c.address)
                c.balance = Number.parseFloat(rs.result) / 1000000000000000000
                c.balanceString = this.toNumberString(c.balance)
                c.value = c.balance * c.price || 0
                c.valueString = this.toNumberString(c.value)
                totalValue += c.value
                this.totalValue = this.toNumberString(totalValue)
            } catch (err) {
                console.error(err)
            }
            setTimeout(() => { }, 200)
        }
    }

    async initCoins() {
        try {
            this.coins = await this.service.getCoins()
        } catch (err) {
            this.error(err)
        }
    }

    initPrices() {
        this.coins.forEach(async x => {
            try {
                let rs = await this.service.pancake.getToken(x.address)
                let data = rs.data
                let price = Number.parseFloat(data.price)
                x.name = data.symbol || x.name
                x.price = price
                x.priceString = this.toNumberString(price)
            } catch (err) {
                console.error(err)
            }
        })
    }

    async ngOnInit() {
        this.setProcessing(true)
        this.items = [
            { label: 'Add', icon: 'pi pi-fw pi-plus', command: () => this.add() },
            { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.edit(this.selectedData) },
            { separator: true },
            { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => this.delete(this.selectedData) }
        ]
        await Promise.all([this.initBnb(), this.initCoins()])
        this.initPrices()
        this.setProcessing(false)
        await this.initBalances()
        await this.saveCoins()
    }

    async save() {
        try {
            this.setProcessing(true)
            let id = this.coin.id
            if (id) {
                let rs = await this.service.putCoin(this.coin)
                let coin = this.coins.find(x => x.id == id) || new CoinInfo()
                Object.keys(rs).forEach(x => {
                    coin[x] = rs[x]
                })
            } else {
                let rs = await this.service.postCoin(this.coin)
                this.coins = [rs, ...this.coins]
            }
            this.display = false
            this.setProcessing(false)
        } catch (err) {
            this.error(err)
        }
    }

    async saveCoins() {
        try {
            this.setProcessing(true)
            await this.service.putCoins(this.coins)
            this.setProcessing(false)
        } catch (err) {
            this.error(err)
        }
    }

    toNumberString(e: number) {
        if (!e || isNaN(e)) {
            e = 0
        }
        return e.toLocaleString("en-US", { minimumFractionDigits: 4 })
    }
}