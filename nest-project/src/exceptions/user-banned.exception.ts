import { HttpException, HttpStatus } from "@nestjs/common";


export class UserBannedException extends HttpException {
  constructor(id: number) {
    super(`Пользователь с id: ${id} - забанен`, HttpStatus.FORBIDDEN);
  }
}
