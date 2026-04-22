const fs = require('fs');
fs.writeFileSync('out.txt', '');
const lines = fs.readFileSync('js/game.js', 'utf8').split('\n');
lines.forEach((l, i) => {
    if (l.includes('TỬ VONG')) {
        fs.appendFileSync('out.txt', 'Line ' + (i + 1) + '\n');
    }
});
