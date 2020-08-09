import Transaction from '../models/Transaction';

export interface Balance {
  income: number;
  outcome: number;
  total: number;
}

export type CreateTransactionDTO = Omit<Transaction, 'id'>;

export enum TransactionType {
  income = 'income',
  outcome = 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    return this.transactions.reduce((accumulate, current) => {

      (current.type === TransactionType.income)
        ? income += current.value
        : outcome += current.value;

      const total = income - outcome;

      return { income, outcome, total } as Balance;

    }, { income: 0, outcome: 0, total: 0} );
  }

  public create(transactionDTO: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(transactionDTO);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
