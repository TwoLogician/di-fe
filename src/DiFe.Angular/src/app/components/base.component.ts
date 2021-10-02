export class BaseComponent {

    blocked = false
    ngModelOptions = { standalone: true }
    walletAddress = this.getWalletAddress()

    error(err: any) {
        if (err.error && err.error.message) {
            alert(err.error.messaeg)
        } else {
            alert(err.message)
        }
        console.error(err)
        this.setBlocked(false)
    }

    getWalletAddress() {
        return localStorage.getItem("wallet") || ""
    }

    setBlocked(e: boolean) {
        this.blocked = e
    }

    setWalletAddress() {
        localStorage.setItem("wallet", this.walletAddress)
    }
}