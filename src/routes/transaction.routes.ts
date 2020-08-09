import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import GetTransactionStatementService from '../services/GetTransactionsStatementService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactionStatementService = new GetTransactionStatementService(transactionsRepository);

    const transactionStatement = transactionStatementService.execute();

    return response.json(transactionStatement);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransactionService = new CreateTransactionService(transactionsRepository);

    const createTransaction = createTransactionService.execute({ title, value, type });

    return response.json(createTransaction);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
