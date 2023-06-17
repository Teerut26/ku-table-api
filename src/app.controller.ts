import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import screenshot from './utils/screenshot';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/screenshot/:id')
  async getScreenshot(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    // Generate the PNG buffer (replace with your own logic)
    const pngBuffer = await screenshot('https://www.google.com/');

    // Set the appropriate headers for the response
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename=${id}.png`);

    // Send the PNG buffer as the response
    res.send(pngBuffer);
  }
}
