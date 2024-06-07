import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import { Response } from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post("login")
  async login(
    @Body() body: any,
    @Res({ passthrough: true }) response: Response
  ) {
    const res: any = await this.appService.login(body);
    response.cookie("accessKey", res.accessToken, {
      maxAge: 30000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    response.cookie("refreshKey", res.refreshToken, {
      maxAge: 600000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    response.json({ messge: res.message });
  }
}
