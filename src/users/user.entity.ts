let id = 0;

export class User {
  id: number;

  constructor(
    public username: string,
    public email: string,
  ) {
    this.id = ++id;
  }
}
