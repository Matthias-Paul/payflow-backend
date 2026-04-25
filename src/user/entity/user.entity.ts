import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
// import { Account } from '../account/account.entity';
// import { Bank } from '../bank/bank.entity';
// import { Transaction } from '../transaction/transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  password: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  firstName: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  lastName: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  address1: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  city: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  state: string;

  @Column({ type: 'varchar', nullable: false, length: 20 })
  postalCode: string;

  @Column({ type: 'varchar', nullable: false, length: 20 })
  dateOfBirth: string;

  @Column({ type: 'varchar', nullable: false, length: 20 })
  ssn: string;

  @Column({ type: 'varchar', nullable: true, length: 255, unique: true })
  dwollaCustomerUrl: string;

  @Column({ type: 'varchar', nullable: true, length: 255, unique: true })
  dwollaCustomerId: string;

  // @OneToOne(() => Account, (account) => account.user)
  // account: Account;

  // @OneToOne(() => Bank, (bank) => bank.user)
  // bank: Bank;

  // @OneToMany(() => Transaction, (transaction) => transaction.user)
  // transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
