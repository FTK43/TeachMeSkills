let id = 0;

export class User {
  id: number;

  constructor(
    public usernames: string,
    public email: string,
  ) {
    this.id = ++id;
  }
}
