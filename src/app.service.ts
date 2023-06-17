import { Injectable } from '@nestjs/common';
import fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'KU Table Api';
  }
  getScreenshot(id: string): string {
    console.log(id);

    return 'KU Table Api';
  }
}
