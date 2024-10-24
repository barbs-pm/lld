class ATMCard {
    constructor(cardNumber, pin, account) {
        this.cardNumber = cardNumber;
        this.pin = pin;
        this.account = account;
    }

    validatePin(inputPin) {
        return this.pin === inputPin;
    }

    getLinkedAccount() {
        return this.account;
    }
}