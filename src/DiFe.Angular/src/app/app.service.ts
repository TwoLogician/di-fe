import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { CoinInfo } from "./models"

declare let process: any

@Injectable()
export class AppService {

    baseAddress = ""
    bscscan = {
        getBalance: () => this.http.get<any>(`https://api.bscscan.com/api?module=account&action=balance&address=${this.getWallAddress()}&apikey=829EW6YIVQWU42AV5VEC3HBE9KU1KHZZD1`).toPromise(),
        getTokenBalance: (contractAddress: string) => this.http.get<any>(`https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${this.getWallAddress()}&tag=latest&apikey=829EW6YIVQWU42AV5VEC3HBE9KU1KHZZD1`).toPromise(),
    }
    pancake = {
        getToken: (address: string) => this.http.get<any>(`https://api.pancakeswap.info/api/v2/tokens/${address}`).toPromise(),
    }

    constructor(private http: HttpClient) {
        if (process.env.NODE_ENV == "development") {
            this.baseAddress = "http://localhost:5000"
        }
    }

    private getApi(route: string) {
        return `${this.baseAddress}/${route}`
    }

    private getWallAddress() {
        return localStorage.getItem("wallet") || ""
    }

    getCoins() {
        return this.http.get<CoinInfo[]>(this.getApi(`coin/wallet/${this.getWallAddress()}`)).toPromise()
    }

    postCoin(body: CoinInfo) {
        body.wallet = this.getWallAddress()
        return this.http.post<CoinInfo>(this.getApi("coin"), body).toPromise()
    }

    putCoin(body: CoinInfo) {
        body.wallet = this.getWallAddress()
        return this.http.put<CoinInfo>(this.getApi(`coin/${body.id}`), body).toPromise()
    }

    putCoins(body: CoinInfo[]) {
        body.forEach(x => {
            if (!x.price) {
                x.price = 0
            }
            if (!x.value || isNaN(x.value)) {
                x.value = 0
            }
        })
        return this.http.put<CoinInfo[]>(this.getApi("coin"), body).toPromise()
    }

    deleteCoin(id: string) {
        return this.http.delete(this.getApi(`coin/${id}`)).toPromise()
    }
}