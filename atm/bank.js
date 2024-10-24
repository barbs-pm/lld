class Bank {
    constructor(name) {
        this.name = name;
        this.accounts = new Map();
    }

    addAccount(account) {
        this.accounts.set(account.accountNumber, account);
    }

    getAccount(accountNumber) {
        return this.accounts.get(accountNumber);
    }
}