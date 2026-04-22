const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        page.on('console', msg => console.log('LOG:', msg.text()));
        page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

        console.log("Navigating...");
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

        await page.evaluate(async () => {
            const input = document.getElementById('aiChatInput');
            if (input) {
                input.value = 'đột quỵ';
                await sendChatMessage();
            }
        });

        console.log("Checking chat output...");
        const msgs = await page.evaluate(() => {
            return document.getElementById('aiChatMessages').innerText;
        });
        console.log("MESSAGES:", msgs);

        await browser.close();
        console.log("Done");
    } catch (e) {
        console.log("Script failed:", e.message);
    }
})();
