import TransactionsRepository, { TransactionType, Balance } from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionStatement {
  transactions: Transaction[];
  balance: Balance;
}

class GetTransactionStatementService {

  constructor(private transactionsRepository: TransactionsRepository) {}

  public execute(): TransactionStatement {

    const transactions = this.transactionsRepository.all();

    const balance = this.transactionsRepository.getBalance();

    const transactionStatement = {
      transactions,
      balance
    } as TransactionStatement;

    return transactionStatement;
  }
}

export default GetTransactionStatementService;
