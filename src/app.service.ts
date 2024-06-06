<<<<<<< HEAD
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  private ACCESS_SECRETKEY = this.configService.get("ACCESS_SECRETKEY");
  private REFREWSH_SECRETKEY = this.configService.get("REFREWSH_SECRETKEY");
  getHello(): string {
    return "Hello World!";
  }
  async login(user): Promise<object> {
    const data = user;
    console.log(
      this.ACCESS_SECRETKEY,
      // process.env.ACCESS_SECRETKEY,
      'this.ACCESS_SECRETKEY',
      // process.env.REFREWSH_SECRETKEY,
      this.REFREWSH_SECRETKEY,
      'this.REFREWSH_SECRETKEY'
    );    
    const accessToken = this.jwtService.sign(data, {secret: this.ACCESS_SECRETKEY});
    const refreshToken = this.jwtService.sign(data, {secret: this.REFREWSH_SECRETKEY});
    return {
      message: `Login SuccessFull`,
      accessToken,
      refreshToken,
    };
=======
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
>>>>>>> origin/main
  }
}
