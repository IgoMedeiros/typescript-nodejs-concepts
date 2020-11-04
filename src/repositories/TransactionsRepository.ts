import Transaction from '../models/Transaction';
import { EntityRepository, Repository } from 'typeorm'

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

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {

  public async getBalance(): Promise<Balance> {
    let income = 0;
    let outcome = 0;

    const transactions = await this.find();

    return transactions.reduce((accumulate, current) => {

      (current.type === TransactionType.income)
        ? income += current.value
        : outcome += current.value;

      const total = income - outcome;

      return { income, outcome, total } as Balance;

    }, { income: 0, outcome: 0, total: 0} );
  }
}

export default TransactionsRepository;
