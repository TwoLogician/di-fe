import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"
import { AppService } from "src/app/app.service"

import { WebsiteInfo } from "src/app/models"
import { BaseComponent } from "../base.component"

@Component({
    selector: "website",
    templateUrl: "./website.component.html",
})
export class WebsiteComponent extends BaseComponent implements OnInit {

    website = new WebsiteInfo()
    websites: WebsiteInfo[] = []
    display = false
    items: MenuItem[] = []
    selectedData = new WebsiteInfo()

    constructor(private service: AppService) {
        super()
    }

    add() {
        this.website = new WebsiteInfo()
        this.display = true
    }

    async delete(e: WebsiteInfo) {
        try {
            if (!confirm("Are you sure?")) {
                return
            }
            this.setProcessing(true)
            await this.service.deleteWebsite(e.id)
            this.websites = this.websites.filter(x => x.id != e.id)
            this.setProcessing(false)
        } catch (err) {
            this.error(err)
        }
    }

    edit(e: WebsiteInfo) {
        let { ...website } = e
        this.website = website
        this.display = true
    }

    async initWebsites() {
        try {
            this.websites = await this.service.getWebsites()
        } catch (err) {
            this.error(err)
        }
    }

    async ngOnInit() {
        this.setProcessing(true)
        await this.initWebsites()
        this.items = [
            { label: 'Add', icon: 'pi pi-fw pi-plus', command: () => this.add() },
            { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.edit(this.selectedData) },
            { separator: true },
            { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => this.delete(this.selectedData) }
        ];
        this.setProcessing(false)
    }

    async save() {
        try {
            this.setProcessing(true)
            let id = this.website.id
            if (id) {
                let rs = await this.service.putWebsite(this.website)
                let website = this.websites.find(x => x.id == id) || new WebsiteInfo()
                Object.keys(rs).forEach(x => {
                    website[x] = rs[x]
                })
            } else {
                let rs = await this.service.postWebsite(this.website)
                this.websites = [rs, ...this.websites]
            }
            this.display = false
            this.setProcessing(false)
        } catch (err) {
            this.error(err)
        }
    }
}