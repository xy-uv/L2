// * Getter and Setter of pure OOP

class BankAccount {
  readonly uid: string;
  public name: string;
  protected accountNo: number;
  readonly bankName: string;
  private accBalance: number;

  constructor(
    uid: string,
    name: string,
    accountNo: number,
    bankName: string,
    accBalance: number
  ) {
    this.uid = uid;
    this.name = name;
    this.accountNo = accountNo;
    this.bankName = bankName;
    this.accBalance = accBalance;
  }

  set setBalance(balance: number) {
    this.accBalance += balance;
  }

  get getBalance() {
    return this.accBalance;
  }

  set withdrawBalance(balance: number) {
    this.accBalance -= balance;
  }
}

const shahriarAccount = new BankAccount(
  "PB7894753",
  "Shahriar Ahmed",
  7848957359483,
  "Prime Bank",
  35500
);
shahriarAccount.setBalance = 15000;
shahriarAccount.withdrawBalance = 12500;
console.log(shahriarAccount);
console.log(shahriarAccount.getBalance);
