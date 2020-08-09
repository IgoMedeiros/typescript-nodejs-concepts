import TransactionsRepository, { CreateTransactionDTO, TransactionType } from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {

  constructor(private transactionsRepository: TransactionsRepository) {}

  public execute(createTransactionDTO: CreateTransactionDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (createTransactionDTO.type === TransactionType.outcome && +createTransactionDTO.value > balance.total) {
      throw Error('Valor extrapola saldo disponível.');
    }

    const transaction = this.transactionsRepository.create(createTransactionDTO);

    return transaction;
  }
}

export default CreateTransactionService;
