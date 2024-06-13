import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  private ACCESS_SECRETKEY = this.configService.get('ACCESS_SECRETKEY');
  private REFRESH_SECRETKEY = this.configService.get('REFRESH_SECRETKEY');
  getHello(): string {
    return 'Hello World!';
  }

  async login(user): Promise<any> {
    const data = user;
    const saltOrRounds = 10;
    const password = 'random_password';
    const myprofilepass = 'some random place which one you will know later on.';
    const hash = await bcrypt.hash(password, saltOrRounds);
    const salt = await bcrypt.genSalt();
    const hash1 = await bcrypt.hash(myprofilepass, salt);
    console.log(
      this.ACCESS_SECRETKEY,
      // process.env.ACCESS_SECRETKEY,
      'this.ACCESS_SECRETKEY',
      // process.env.REFRESH_SECRETKEY,
      this.REFRESH_SECRETKEY,
      'this.REFRESH_SECRETKEY',
      Array.isArray(data),
      hash,
      'hash',
      salt,
      'salt',
      hash1,
      'hash1'
    );
    const isMatch = await bcrypt.compare(password, hash);
    const isMatch1 = await bcrypt.compare(myprofilepass, hash1);
    console.log(isMatch,'isMatch',isMatch1,'isMatch1');
    
    const accessToken = this.jwtService.sign(data, {
      secret: this.ACCESS_SECRETKEY,
    });
    const refreshToken = this.jwtService.sign(data, {
      secret: this.REFRESH_SECRETKEY,
    });
    return {
      message: `Login SuccessFull`,
      accessToken,
      refreshToken,
    };
  }
}
