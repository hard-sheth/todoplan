import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CookieSession implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  private ACCESS_SECRETKEY = this.configService.get("ACCESS_SECRETKEY");
  private REFREWSH_SECRETKEY = this.configService.get("REFREWSH_SECRETKEY");
 async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    const allCookies = req.cookies
    console.log(allCookies, 'allCookies')
    if(!allCookies.accessKey){
      if(allCookies.refreshKey){
        try {
          const dataOfToken =await this.jwtService.verifyAsync(allCookies.refreshKey,{secret:this.REFREWSH_SECRETKEY})
          
          const accessToken = this.jwtService.sign(dataOfToken, {secret: this.ACCESS_SECRETKEY});
          res.cookie('accessKey',accessToken,{
            maxAge: 30000,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          })
          next()
        } catch (error) {
          throw new ForbiddenException('Sorry! May be session Expired or User Have to login again')  
        }
      }
      else{
        throw new ForbiddenException('Sorry! May be session Expired or User Have to login again')
      }
    }
    else{
      next();
    }
  }
}
