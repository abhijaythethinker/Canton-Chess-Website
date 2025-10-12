const puppeteer = require('puppeteer');
const chromium = require('@sparticuz/chromium');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { uscfId } = req.body;
    if (!uscfId) {
        return res.status(400).json({ error: 'USCF ID is required' });
    }

    try {
        console.log(`Processing USCF ID: ${uscfId}`);

        let browser;
        if (process.env.VERCEL) {
            await chromium.font('https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf');
            browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
                ignoreHTTPSErrors: true,
            });
        } else {
            browser = await puppeteer.launch({ headless: true });
        }

        const page = await browser.newPage();
        await page.goto('https://new.uschess.org/civicrm/player-search', { waitUntil: 'networkidle0', timeout: 60000 });


        await page.type('#external-identifier-0', uscfId);
        await page.click('button[ng-click="$ctrl.onClickSearchButton()"]');

        await page.waitForSelector('span.ng-binding.ng-scope', { timeout: 10000 });

        const result = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('span.ng-binding.ng-scope'));
            let expirationDate = null;
            let playerName = null;
            let playerRating = null;

            for (let el of elements) {
                const text = el.textContent.trim();
                if (/^\d{2}\/\d{2}\/\d{4}$/.test(text)) {
                    expirationDate = text;
                }
            }

            const nameElement = document.querySelector('span[ng-repeat="link in colData.links"] a');
            if (nameElement) {
                playerName = nameElement.textContent.trim();
            }

            const ratingCell = document.querySelector('table tr:nth-child(2) td:nth-child(3) span.ng-binding.ng-scope');
            playerRating = ratingCell && ratingCell.textContent.trim() !== '' 
                ? ratingCell.textContent.trim() 
                : '101';

            return { expirationDate, playerName, playerRating };
        });

        await browser.close();

        console.log('Scraping result:', result);

        if (result.expirationDate || result.playerName) {
            return res.json(result);
        } else {
            return res.status(404).json({ error: 'Player information not found' });
        }
    } catch (error) {
        console.error('Error during scraping:', error);
        return res.status(500).json({ error: 'Failed to scrape player information' });
    }
}
