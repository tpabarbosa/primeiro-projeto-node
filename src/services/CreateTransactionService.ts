import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (type === 'outcome' && (this.transactionsRepository.getBalance().total - value) < 0) {
       throw Error('error string');
    }

    const transaction = this.transactionsRepository.create( { title, value, type } )

    return transaction;
  }
}

export default CreateTransactionService;
