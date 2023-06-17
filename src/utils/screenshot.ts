// import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export default async function screenshot(
  url: string,
  width: number = 1920,
  height: number = 1080,
) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath:
      '/usr/bin/google-chrome',
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(url, { waitUntil: 'networkidle2' });

  //   await page.waitForSelector(
  //     '#__next > div.flex.flex-col.gap-2.p-5 > div.mt-3.overflow-x-auto.border-[1px].border-base-content > div > div > div.relative.z-10',
  //   ); // Method to ensure that the element is loaded
  //   const logo = await page.$(
  //     '#__next > div.flex.flex-col.gap-2.p-5 > div.mt-3.overflow-x-auto.border-[1px].border-base-content > div > div > div.relative.z-10',
  //   );

  //   const session = await page?.target().createCDPSession();
  //   await session.send('Emulation.setPageScaleFactor', {
  //     pageScaleFactor: 4, // 400%
  //   });

  return await page?.screenshot({ type: 'png' });
}
