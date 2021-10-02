import { Component, OnInit } from "@angular/core"
import { PrimeNGConfig } from "primeng/api"

declare let Web3: any
declare let window: any

import { BaseComponent } from "./components/base.component"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent extends BaseComponent implements OnInit {

  isConnected = false
  tab = 0

  constructor(private primengConfig: PrimeNGConfig) {
    super()
  }

  connect() {
    this.setWalletAddress()
    this.isConnected = true
  }

  disconnect() {
    localStorage.clear()
    this.isConnected = false
  }

  ngOnInit() {
    this.primengConfig.ripple = true
    this.isConnected = this.getWalletAddress() != ""
  }

  async walletConnect() {
    window.web3 = new Web3(window.ethereum);
    let addresses = await window.ethereum.request({ method: "eth_accounts" })
    if (!addresses.length) {
      try {
        addresses = await window.ethereum.enable();
      } catch (e) {
        this.error(e)
        return
      }
    }
    this.walletAddress = addresses[0]
    this.connect()
  }
}
