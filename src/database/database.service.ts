import { Injectable } from '@nestjs/common';
import { MassiveService } from '@nestjsplus/massive';

@Injectable()
export class DatabaseService {
  constructor(private readonly massiveService: MassiveService) {}

  async connect(): Promise<any> {
    return this.massiveService.connect();
  }
}
