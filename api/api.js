// const puppeteer = require('puppeteer');
// const chromium = require('@sparticuz/chromium');

// export default async function handler(req, res) {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ error: 'Method Not Allowed' });
//     }

//     //uscf id
//     const { uscfId } = req.body;
//     if (!uscfId) {
//         return res.status(400).json({ error: 'USCF ID is required' });
//     }

//     try {
//         console.log(`Processing USCF ID: ${uscfId}`);

//         let browser;
//         if (process.env.VERCEL) {
//             await chromium.font('https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf');
//             browser = await puppeteer.launch({
//                 args: chromium.args,
//                 defaultViewport: chromium.defaultViewport,
//                 executablePath: await chromium.executablePath(),
//                 headless: chromium.headless,
//                 ignoreHTTPSErrors: true,
//             });
//         } else {
//             browser = await puppeteer.launch({ headless: true });
//         }

//         const page = await browser.newPage();
//         await page.goto(`https://ratings.uschess.org/?fuzzy=${uscfId}`, { waitUntil: 'networkidle0', timeout: 60000 });

//         await page.waitForFunction(() => {
//             return document.querySelector('span.font-regular') || document.querySelector('p');
//         }, { timeout: 40000 });  

//         const noResults = await page.$('p');
//         if (noResults) {
//             const text = await page.evaluate(el => el.textContent, noResults);
//             if (text.includes('No results found')) {
//                 await browser.close();
//                 return res.status(404).json({ error: 'Player information not found' });
//             }
//         }

//         const result = await page.evaluate(() => {
//             let expirationDate = null;
//             let playerName = null;

//             const firstNameEl = document.querySelector('span.font-regular');
//             const lastNameEl = document.querySelector('span.font-semibold');
//             if (firstNameEl && lastNameEl) {
//                 playerName = `${firstNameEl.textContent.trim()} ${lastNameEl.textContent.trim()}`;
//             }

//             const expWrapper = Array.from(document.querySelectorAll('span')).find(el => el.textContent.includes('Exp:'));

//             if (expWrapper) {
//                 const expEl = expWrapper.querySelector('span.font-mono');
//                 if (expEl) {
//                 expirationDate = expEl.textContent.trim();
//                 }
//             }

//             return { expirationDate, playerName };
//         });

//         await browser.close();

//         console.log('Scraping result:', result);

//         if (result.expirationDate || result.playerName) {
//             return res.json(result);
//         } else {
//             return res.status(404).json({ error: 'Player information not found' });
//         }
//     } catch (error) {
//         console.error('Error during scraping:', error);
//         return res.status(500).json({ error: 'Failed to scrape player information' });
//     }
// }

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

    let browser;
    try {
        console.log(`Processing USCF ID: ${uscfId}`);

        // ---------- Launch browser ----------
        if (process.env.VERCEL) {
            await chromium.font('https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf');
            browser = await puppeteer.launch({
                args: chromium.args.concat([
                    '--disable-dev-shm-usage',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-gpu',
                    '--disable-extensions',
                    '--disable-background-networking',
                    '--disable-sync',
                ]),
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
                ignoreHTTPSErrors: true,
            });
        } else {
            browser = await puppeteer.launch({ headless: true });
        }

        const page = await browser.newPage();

        // ---------- Block unnecessary requests ----------
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            const resourceType = req.resourceType();
            if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
                req.abort();
            } else {
                req.continue();
            }
        });

        // ---------- Go to page ----------
        const url = `https://ratings.uschess.org/?fuzzy=${uscfId}`;
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // ---------- Wait for either name or "No results" ----------
        await page.waitForFunction(() => {
            return document.querySelector('span.font-regular') || document.querySelector('p');
        }, { timeout: 15000 });

        // ---------- Check for "No results" ----------
        const noResults = await page.$('p');
        if (noResults) {
            const text = await page.evaluate(el => el.textContent, noResults);
            if (text.includes('No results found')) {
                await browser.close();
                return res.status(404).json({ error: 'Player information not found' });
            }
        }

        // ---------- Scrape data ----------
        const result = await page.evaluate(() => {
            let playerName = null;
            let expirationDate = null;

            const firstNameEl = document.querySelector('span.font-regular');
            const lastNameEl = document.querySelector('span.font-semibold');
            if (firstNameEl && lastNameEl) {
                playerName = `${firstNameEl.textContent.trim()} ${lastNameEl.textContent.trim()}`;
            }

            const expWrapper = Array.from(document.querySelectorAll('span'))
                .find(el => el.textContent.includes('Exp:'));
            if (expWrapper) {
                const expEl = expWrapper.querySelector('span.font-mono');
                if (expEl) expirationDate = expEl.textContent.trim();
            }

            return { playerName, expirationDate };
        });

        await browser.close();

        if (!result.playerName && !result.expirationDate) {
            return res.status(404).json({ error: 'Player information not found' });
        }

        console.log('Scraping result:', result);
        return res.json(result);

    } catch (error) {
        if (browser) await browser.close();
        console.error('Error during scraping:', error);
        return res.status(500).json({ error: 'Failed to scrape player information' });
    }
}