import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, firstValueFrom, retry, throwError } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('PING_SERVICE') private client: ClientProxy) {}

  async ping(msg: string) {
    const res = await firstValueFrom(this.client.send('new-message', {value : msg}).pipe(
      catchError((err) => {
        console.error('Remote Call Fail: ', err.message);
        return throwError(() => new Error('RPC FAILURE'));
      })
    ));
    console.log(res);

    return res;
  }

  async emitMessageCreated(message: {id: number; value: string}) {
    this.client.emit('message.created', message).subscribe({
      complete: () => console.log('event emitted'),
    });
  }

  async callUnstable() {
    return firstValueFrom(
      this.client.send('unstable', {}).pipe(
        retry(5),
        catchError((err) => {
          console.log('Ошибка после 5 попыток:', err.message);
          return throwError(() => new Error('RPC FAILURE'));
        })
      )
    )
  }
}