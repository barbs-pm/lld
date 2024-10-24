class ATM {
    constructor(bank) {
        this.bank = bank;
        this.currentCard = null;
    }

    insertCard(atmCard) {
        this.currentCard = atmCard;
        console.log('Card Inserted');
    }

    ejectCard() {
        this.currentCard = null;
        console.log('Card Ejected');
    }

    authenticate(pin) {
        return this.currentCard && this.currentCard.validatePin(pin);
    }

    performTransaction(transactionType, amount) {
        if (this.currentCard) {
            const account = this.currentCard.getLinkedAccount();
            if (transactionType === 'withdraw') {
                return account.withdraw(amount);
            } else if (transactionType === 'deposit') {
                return account.deposit(amount);
            } else if (transactionType === 'balance') {
                return account.getBalance();
            }
        }
        return 'No card provided, transaction failed.'
    }
}