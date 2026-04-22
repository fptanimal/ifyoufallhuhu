const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 800 });

        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

        await page.evaluate(() => {
            if (typeof openAI !== 'undefined') openAI();
        });

        await new Promise(r => setTimeout(r, 1000));

        // Open the chatbot explicitly
        await page.evaluate(() => {
            document.getElementById('aiChat').classList.remove('minimized');
            document.getElementById('aiChatInput').value = 'đột quỵ';
            sendChatMessage();
        });

        await new Promise(r => setTimeout(r, 2000));

        await page.screenshot({ path: 'test_screenshot.png' });

        await browser.close();
        console.log("Screenshot saved.");
    } catch (e) {
        console.log("Script failed:", e.message);
    }
})();
