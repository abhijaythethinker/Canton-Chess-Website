const puppeteer = require('puppeteer');
const chromium = require('@sparticuz/chromium');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    //uscf id
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
        await page.goto(`https://ratings.uschess.org/?fuzzy=${uscfId}`, { waitUntil: 'networkidle0', timeout: 60000 });

        await page.waitForFunction(() => {
            return document.querySelector('span.font-regular') || document.querySelector('p');
        }, { timeout: 40000 });  

        const noResults = await page.$('p');
        if (noResults) {
            const text = await page.evaluate(el => el.textContent, noResults);
            if (text.includes('No results found')) {
                await browser.close();
                return res.status(404).json({ error: 'Player information not found' });
            }
        }

        const result = await page.evaluate(() => {
            let expirationDate = null;
            let playerName = null;

            const firstNameEl = document.querySelector('span.font-regular');
            const lastNameEl = document.querySelector('span.font-semibold');
            if (firstNameEl && lastNameEl) {
                playerName = `${firstNameEl.textContent.trim()} ${lastNameEl.textContent.trim()}`;
            }

            const expWrapper = Array.from(document.querySelectorAll('span')).find(el => el.textContent.includes('Exp:'));

            if (expWrapper) {
                const expEl = expWrapper.querySelector('span.font-mono');
                if (expEl) {
                expirationDate = expEl.textContent.trim();
                }
            }

            return { expirationDate, playerName };
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
