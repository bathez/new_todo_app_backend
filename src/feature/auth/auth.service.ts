import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async authenticateUser(dto: User) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    console.log(dto.email);
    if (!user) throw new ForbiddenException('Email is incorrect');
    if (!(await argon2.verify(user.password, dto.password)))
      throw new ForbiddenException('password is incorrect');

    return user;

    // const data = fs.readFileSync(
    //   __dirname + '/../../../src/feature/auth/model/users.json',
    //   'utf8',
    // );
    // const users: User[] = JSON.parse(data);
    // const currentUser = users.find(
    //   (u) => u.username === dto.username && u.password === dto.password,
    // );
    // if (!currentUser)
    //   throw new UnauthorizedException('Email or pssword is wrong sucker');

    // delete currentUser.password;
    // return currentUser;
  }

  handleLogin(user: User) {
    console.log(user);
    delete user.password;
    //delete user.id;
    return {
      ...user,
      token: this.jwtService.sign(
        {
          username: user.username,
          sub: user.id,
        },
        { secret: this.configService.get('ACCESS_JWT'), expiresIn: '15m' },
      ),
    };
  }

  async createAccount(dto: User) {
    const user = await this.prismaService.user.findFirst({
      where: { email: dto.email },
    });

    if (user) {
      throw new ForbiddenException('Email is already taken');
    }
    const hashedPassword = await argon2.hash(dto.password);
    const info = await this.prismaService.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: hashedPassword,
        email: dto.email,
        username: dto.username,
      },
    });
    return {
      message: 'Your account has been created successfully',
      id: info.id,
    };
  }
}
// https://duncanhunter.gitbook.io/enterprise-angular-applications-with-ngrx-and-nx/introduction/introduction
