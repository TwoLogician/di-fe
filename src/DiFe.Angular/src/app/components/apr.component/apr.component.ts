import { Component } from "@angular/core"

import { BaseComponent } from "../base.component"

@Component({
    selector: "apr",
    templateUrl: "./apr.component.html"
})
export class AprComponent extends BaseComponent {

    apr: any
    day = 0
    hour = 0
    lock = 0
    minute = 0
    month = 0
    stake: any

    cal() {
        let apr = this.apr
        if (this.lock) {
            apr = (this.apr * this.lock) / 100
        }
        let day = apr / 365
        let hour = day / 24
        let minute = hour / 60
        let month = day * 30
        let onePercent = this.stake / 100

        this.day = onePercent * day
        this.hour = onePercent * hour
        this.minute = onePercent * minute
        this.month = onePercent * month
    }
}