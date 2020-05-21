var fs = require('fs');
//readFileSync表示的是stream，readFile表示的是buffer
var source = fs.readFileSync('logo.png');
fs.writeFileSync('steam_copy_logo.png', source);
