const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        page.on('console', msg => console.log('PAGE LOG:', JSON.stringify(msg.text())));
        page.on('pageerror', error => console.log('PAGE ERROR:', JSON.stringify(error.message)));

        console.log("Navigating...");
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

        console.log("Executing JS...");
        await page.evaluate(() => {
            if (typeof document.getElementById('aiChat') !== 'undefined') {
                console.log("Found aiChat!");
                document.getElementById('aiChatInput').value = 'Chào bác sĩ';
                sendChatMessage();
            } else {
                console.log("aiChat not found");
            }
        });

        await new Promise(r => setTimeout(r, 2000));
        await browser.close();
        console.log("Done");
    } catch (e) {
        console.log("Script failed:", e.message);
    }
})();
