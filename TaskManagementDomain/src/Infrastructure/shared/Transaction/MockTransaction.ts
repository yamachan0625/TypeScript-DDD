import { ITransaction } from 'Domain/shared/IRunTransaction';

export class MockTransaction implements ITransaction {
  async get() {
    return;
  }
  async getAll() {
    return;
  }
  async query() {
    return;
  }
  async set() {
    return;
  }
  async update() {
    return;
  }
  async remove() {
    return;
  }
}
