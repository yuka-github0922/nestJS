import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'; // 今回はjwtを使うのでpassport-jwtを使う
import { JwtPayload } from '../types/jwtPayload.type';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    // superではjwtの設定を行う
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // jwtを取得する方法を指定
      ignoreExpiration: false, // 有効期限のチェックを行うかどうか
      secretOrKey: process.env.JWT_SECRET, // jwtの署名に使う
    });
  }

  // 以下、認証を行うためのmethod、名前変更できない
  async validate(payload: JwtPayload): Promise<User | null> {
    return await this.userService.getUser(payload.email);
  }
}
