const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        page.on('console', msg => console.log('PAGE LOG:', JSON.stringify(msg.text())));
        page.on('pageerror', error => console.log('PAGE ERROR:', JSON.stringify(error.message)));

        console.log("Navigating to http://localhost:3000 ...");
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

        console.log("Clicking aiSubmitBtn...");
        await page.evaluate(async () => {
            if (typeof openAI !== 'undefined') openAI(); // First open the AI modal if needed

            await new Promise(r => setTimeout(r, 1000));

            const btn = document.getElementById('aiSubmitBtn');
            if (btn) {
                console.log("Button found, clicking...");
                btn.click();
            } else {
                console.log("aiSubmitBtn not found.");
            }
        });

        console.log("Waiting for analysis to finish (2.5s)...");
        await new Promise(r => setTimeout(r, 2500));

        // Output the resulting HTML inside aiContent
        const resultHtml = await page.evaluate(() => {
            const content = document.getElementById('aiContent');
            return content ? content.innerHTML : null;
        });
        console.log("HTML inside aiContent:", JSON.stringify(resultHtml).substring(0, 500) + '...');

        await browser.close();
        console.log("Done");
    } catch (e) {
        console.log("Script failed:", e.message);
    }
})();
