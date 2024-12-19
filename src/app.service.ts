import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'KMITL-API BULID 20241220';
  }


}
