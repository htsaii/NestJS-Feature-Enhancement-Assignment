// users/users.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller'; // Import the UsersController
import { UsersService } from './users.service'; // Import the UserService
import { UserSchema } from './user.model'; // Import the User entity and schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Register the User entity with Mongoose
  ],
  controllers: [UsersController], // Include the UsersController
  providers: [UsersService], // Include the UserService
})
export class UsersModule {}
