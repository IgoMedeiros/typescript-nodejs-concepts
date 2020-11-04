import TransactionsRepository, { CreateTransactionDTO, TransactionType } from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { getCustomRepository } from 'typeorm';

class CreateTransactionService {

  public async execute(createTransactionDTO: CreateTransactionDTO): Promise<Transaction> {

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const balance = await transactionsRepository.getBalance();

    if (createTransactionDTO.type === TransactionType.outcome && +createTransactionDTO.value > balance.total) {
      throw Error('Valor extrapola saldo disponível.');
    }

    const transaction = transactionsRepository.create(createTransactionDTO);

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
