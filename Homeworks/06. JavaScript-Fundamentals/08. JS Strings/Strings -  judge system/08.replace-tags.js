function solve(args) {
    var StartsWith = /^<a href="/,
        regexBegin = /<a href="/g,
        matchExtractLable = /(.*?)">(.*?)<\/a>(.*)/,
        part,
        slitted,
        result = '';

    slitted = args[0].split(regexBegin);

    if (!args[0].match(StartsWith)) {
        result += slitted.shift();
    }

    part = slitted.map(m => {
        var match = m.match(matchExtractLable);
        if (match) {
            return '[' + match[2] + '](' + match[1] + ')' + match[3];
        } else {
            return m;
        }
    });

    result += part.join('');

    console.log(result);
}