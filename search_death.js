const fs = require('fs');
const dir = 'js/';
fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.js')) {
        const text = fs.readFileSync(dir + file, 'utf8');
        if (text.includes('PHÂN TÍCH NGUYÊN') || text.includes('TỬ VONG') || text.includes('deadScreen')) {
            console.log('--- Found in ' + file + ' ---');
            text.split('\n').forEach((l, i) => {
                if (l.includes('PHÂN TÍCH NGUYÊN') || l.includes('TỬ VONG') || l.includes('deadScreen')) {
                    console.log((i + 1) + ': ' + l.trim());
                }
            });
        }
    }
});
