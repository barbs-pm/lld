# 🏧 ATM System - Low-Level Design 🛠️

Welcome to the **ATM System** designed using Low-Level Design principles! This project demonstrates how to implement a basic ATM system, where users can perform operations such as checking balances, making withdrawals, deposits, and more. 💸

---

## 🚀 Features

- **Insert ATM Card** 💳
- **Authenticate with PIN** 🔐
- **Check Balance** 🏦
- **Withdraw Money** 💵
- **Deposit Money** 🏧
- **Eject ATM Card** 🏁

---

## 🧩 System Components

Here’s an overview of the main components used in the system:

1. **ATM**: Represents the ATM machine where users interact.
2. **ATMCard**: Represents the card that the user inserts to access their account.
3. **BankAccount**: Manages the account information and handles balance, deposits, and withdrawals.
4. **Customer**: Represents the customer using the ATM.
5. **Transaction**: Represents an individual transaction (withdrawal, deposit, etc.).
6. **Bank**: Stores and manages accounts for customers.

---

## 📋 How It Works

1. **Insert Card**: The user inserts their card using `insertCard()`.
2. **Authenticate PIN**: The user inputs their PIN using `authenticate()`.
3. **Perform Transaction**: Once authenticated, the user can:
   - Check their balance
   - Withdraw money
   - Deposit money
4. **Eject Card**: After completing the transaction, the card is ejected using `ejectCard()`.

---

## 📚 Example Usage

Here’s an example of how the system works:

```javascript
// Create bank accounts
const account1 = new BankAccount("123456789", 500);
const account2 = new BankAccount("987654321", 1000);

// Create ATM cards linked to accounts
const card1 = new ATMCard("1111-2222-3333-4444", "1234", account1);

// Simulate ATM operations
const atm = new ATM();
atm.insertCard(card1);

if (atm.authenticate("1234")) {
    console.log(atm.performTransaction("balance"));
    console.log(atm.performTransaction("withdraw", 100));
    console.log(atm.performTransaction("balance"));
}

atm.ejectCard();
```

Made with 💛 by Bárbara