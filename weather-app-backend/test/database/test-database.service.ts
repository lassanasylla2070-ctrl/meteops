import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class TestDatabaseService {
  constructor(@InjectConnection() readonly connection: Connection) {}

  async dropDatabase() {
    return this.connection.dropDatabase();
  }

  async prepareDatabase() {
    return this.connection.synchronize(true);
  }
}
