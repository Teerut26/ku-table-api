// import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export default async function screenshot(
  url: string,
  deviceScaleFactor: number = 2,
  width: number = 1520,
  height: number = 1080,
) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    executablePath: '/usr/bin/google-chrome',
  });
  const page = await browser.newPage();
  await page.setViewport({
    width,
    height,
    deviceScaleFactor: deviceScaleFactor,
  });
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector('.flex-col.bg-base-100');
  const logo = await page.$('.flex-col.bg-base-100');
  const image = await logo?.screenshot({ type: 'png' });
  await browser.close();
  return image;
}
