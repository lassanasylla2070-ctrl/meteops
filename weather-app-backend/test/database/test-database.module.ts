import { Module } from '@nestjs/common';
import { TestDatabaseService } from './test-database.service';

@Module({
  providers: [TestDatabaseService],
  exports: [TestDatabaseService],
})
export class TestDatabaseModule {}
