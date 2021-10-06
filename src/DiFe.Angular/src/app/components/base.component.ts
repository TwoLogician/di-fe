export class BaseComponent {

    processing = false
    ngModelOptions = { standalone: true }
    walletAddress = this.getWalletAddress()

    error(err: any) {
        if (err.error && err.error.message) {
            alert(err.error.messaeg)
        } else {
            alert(err.message)
        }
        console.error(err)
        this.setProcessing(false)
    }

    getWalletAddress() {
        return localStorage.getItem("wallet") || ""
    }

    setProcessing(e: boolean) {
        this.processing = e
    }

    setWalletAddress() {
        localStorage.setItem("wallet", this.walletAddress)
    }
}