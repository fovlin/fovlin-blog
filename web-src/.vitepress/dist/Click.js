function ClickEvent(){
    var fs = require('fs')
    var count = fs.readFileSync('ClickCount','utf-8');
    count = Number(count)
    count++
    const ret = count.toString();
    fs.writeFileSync('ClickCount', ret);
}
ClickEvent()