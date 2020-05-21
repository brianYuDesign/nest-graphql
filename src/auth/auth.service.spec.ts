import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { UserSchema } from '../users/user.schema';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: 3600, // 1 hour
          },
        }),
      ],
      providers: [
        AuthService,
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: { name: 'User', schema: UserSchema },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
