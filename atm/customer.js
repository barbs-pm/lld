class Customer {
    constructor(name, bankAccount, atmCard) {
        this.name = name;
        this.bankAccount = bankAccount;
        this.atmCard = atmCard;
    }

    getAtmCard() {
        return this.atmCard;
    }

    getBankAccount() {
        return this.bankAccount;
    }
}