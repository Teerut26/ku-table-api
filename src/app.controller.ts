import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import screenshot from './utils/screenshot';
import { Response } from 'express';
import db from './utils/firestoreAdmin';
import { CourseInterface } from './interfaces/CourseInterface';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/screenshot')
  async getScreenshot(
    @Res() res: Response,
    @Body() body: {
        courses: CourseInterface[];
        theme: string;
    },
  ): Promise<void> {
    res.setHeader('Content-Type', `image/png`);
    res.setHeader(
      'Cache-Control',
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
    );
    res.send(
      await this.appService.getScreenshot({
        courses: body.courses,
        theme: body.theme || 'light',
      }),
    );
  }
}
