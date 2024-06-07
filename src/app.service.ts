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
  private REFRESH_SECRETKEY = this.configService.get("REFRESH_SECRETKEY");
  getHello(): string {
    return "Hello World!";
  }
  async login(user): Promise<any> {
    const data = user;
    console.log(
      this.ACCESS_SECRETKEY,
      // process.env.ACCESS_SECRETKEY,
      'this.ACCESS_SECRETKEY',
      // process.env.REFRESH_SECRETKEY,
      this.REFRESH_SECRETKEY,
      'this.REFRESH_SECRETKEY',
      Array.isArray(data),
    );    
    const accessToken = this.jwtService.sign(data, {secret: this.ACCESS_SECRETKEY});
    const refreshToken = this.jwtService.sign(data, {secret: this.REFRESH_SECRETKEY});
    return {
      message: `Login SuccessFull`,
      accessToken,
      refreshToken,
    };
  }
}
