import { Injectable } from '@nestjs/common';
import db from './utils/firestoreAdmin';
import screenshot from './utils/screenshot';
import { CourseInterface } from './interfaces/CourseInterface';
import generateString from './utils/generateString';

@Injectable()
export class AppService {
  getHello(): string {
    return 'KU Table Api';
  }
  async getScreenshot(body: {
    courses: CourseInterface[];
    theme: string;
  }): Promise<string | Buffer> {
    const link = generateString();

    await db.collection('links').doc(link).set({
      link: link,
      courseData: body.courses,
    });

    const pngBuffer = await screenshot(
      `https://kugetreg.vercel.app/screenshot/${link}?theme=${body.theme}`,
      3,
    );

    await db.collection('links').doc(link).delete();

    return pngBuffer;
  }
}
