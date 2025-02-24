const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();

// Vercel assigns a port dynamically, use process.env.PORT for compatibility
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// The route to handle the USCF ID scraping
app.post('/get-membership-expiration', async (req, res) => {
    const { uscfId } = req.body;

    console.log('Received USCF ID:', uscfId);

    if (!uscfId) {
        return res.status(400).json({ error: 'USCF ID is required' });
    }

    try {
        // Launch Puppeteer (with headless mode enabled)
        console.log('Starting Puppeteer...');
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
        const page = await browser.newPage();

        // Navigate to the US Chess website to search for the player
        await page.goto('https://new.uschess.org/civicrm/player-search', { waitUntil: 'networkidle2' });
        
        // Type in the USCF ID and submit the form
        await page.type('#external-identifier-0', uscfId);
        await page.click('button[ng-click="$ctrl.onClickSearchButton()"]');
        
        // Wait for the result to load
        await page.waitForSelector('span.ng-binding.ng-scope', { timeout: 10000 });

        // Extract the expiration date and player name
        const result = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('span.ng-binding.ng-scope'));
            let expirationDate = null;
            let playerName = null;

            // Look for the expiration date in MM/DD/YYYY format
            for (let el of elements) {
                const text = el.textContent.trim();
                if (/^\d{2}\/\d{2}\/\d{4}$/.test(text)) {
                    expirationDate = text;
                }
            }

            // Find the player's name
            const nameElement = document.querySelector('span[ng-repeat="link in colData.links"] a');
            if (nameElement) {
                playerName = nameElement.textContent.trim();
            }

            return { expirationDate, playerName };
        });

        await browser.close();

        console.log('Scraped result:', result);

        // If we found the expiration date and player name, send them back in the response
        if (result.expirationDate || result.playerName) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Player information not found' });
        }
    } catch (error) {
        console.error('Error during scraping:', error);
        res.status(500).json({ error: 'Failed to scrape player information' });
    }
});

// Start the server (use the dynamic port provided by Vercel or fall back to 3000)
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
