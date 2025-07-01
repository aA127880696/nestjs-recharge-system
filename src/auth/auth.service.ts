import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  private users: { id: number; username: string; password: string }[] = [];
  private nextId = 1;

  constructor(private readonly jwtService: JwtService) {}

  register(createUserDto: CreateUserDto) {
    const newUser = {
      id: this.nextId++,
      username: createUserDto.username,
      password: createUserDto.password,
    };
    this.users.push(newUser);
    return {
      message: '註冊成功',
      user: { id: newUser.id, username: newUser.username },
    };
  }

  login(loginUserDto: LoginUserDto) {
    const user = this.users.find(
      (u) =>
        u.username === loginUserDto.username &&
        u.password === loginUserDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('帳號或密碼錯誤');
    }

    const payload = { username: user.username, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      message: '登入成功',
      access_token,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }
}