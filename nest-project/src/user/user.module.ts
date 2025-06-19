import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UsersService } from "../modules/users/users.service";
import { UsersModule } from "../modules/users/users.module";

@Module({
  imports: [UsersModule],
  providers: [UserResolver, UsersService],
})
export class UserModule {}
