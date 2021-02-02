import { Injectable } from '@nestjs/common';
import { Message } from '@super-hero-comparator/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
