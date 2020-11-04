import TransactionsRepository, { TransactionType, Balance } from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { getCustomRepository } from 'typeorm';

interface TransactionStatement {
  transactions: Transaction[];
  balance: Balance;
}

class GetTransactionStatementService {

  public async execute(): Promise<TransactionStatement> {

    const transactionsRepository = getCustomRepository(TransactionsRepository)

    const transactions = await transactionsRepository.find();

    const balance = await transactionsRepository.getBalance();

    const transactionStatement = {
      transactions,
      balance
    } as TransactionStatement;

    return transactionStatement;
  }
}

export default GetTransactionStatementService;
