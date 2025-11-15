// * Access Modifiers

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

  setBalance(balance: number) {
    this.accBalance += balance;
    return this;
  }

  getBalance() {
    console.log(this.accBalance);
    return this;
  }

  withdrawBalance(balance: number) {
    this.accBalance -= balance;
    return this;
  }
}

const shahriarAccount = new BankAccount(
  "PB7894753",
  "Shahriar Ahmed",
  7848957359483,
  "Prime Bank",
  35500
);

shahriarAccount.withdrawBalance(500).getBalance();
shahriarAccount.setBalance(13000).getBalance();
shahriarAccount.withdrawBalance(1000).getBalance();
shahriarAccount.setBalance(2000).getBalance();
shahriarAccount.withdrawBalance(500).getBalance();
shahriarAccount.withdrawBalance(5500).getBalance();
shahriarAccount.withdrawBalance(5000).getBalance();
