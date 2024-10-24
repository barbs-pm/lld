class BankAccount {
    constructor(accountNumber, balance = 0) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    getBalance() {
        return this.balance;
    }

    withdraw(amount) {
        if (this.balance < amount) {
            return "Insufficient funds."
        }
        this.balance -= amount;
        return `Withdrawal successful. New balance: ${this.balance}`;
    }

    deposit(amount) {
        this.balance += amount;
        return `Deposit successful. New balance: ${this.balance}`;
    }
}