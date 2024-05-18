const fs = require('fs');
// const verboseMode = false;
const defaultTag = '<Toolkit>';


// <<< LOGGING >>>
function log(theText, tag) {
    tag = tag ?? defaultTag;
    const theTime = new Date();
    tag != defaultTag ? console.log(`${theTime.toLocaleTimeString()}:${theTime.getMilliseconds()} | Tag:${tag ?? defaultTag} >> ${theText}`) : false;
}
// ---------------

// <<< HTML >>>
// HTML headers >>>
const htmlHeader = ['Content-type', 'text/html'];

// mini toolkit >>>
const loadedPage = (pageName) => `Loaded page: ${pageName}`;

// Pages >>>
// CONSTANTS
const htmlDir = './html';
let data = [];
// ----------
let htmlFiles;
let htmlContents;
scanHtmlFolder();

// function loadHtml(pageName, res) {
//     log('Page: ' + pageName, 'loadHtml');

//     res.setHeader(...htmlHeader);
//     log('Header has been set');

//     res.write(htmlContents[pageName + '.html']);
//     log(loadedPage(pageName), 'loadHtml');

//     return res.end();
// }
function scanHtmlFolder(){
    htmlFiles = fs.readdirSync(htmlDir);
    log('html folder scanned.')
    htmlContents = Object.fromEntries(htmlFiles.map(file => [`${file}`, fs.readFileSync(`${htmlDir}/${file}`).toString()]));
    log('HTML files has been read.');
}
function loadHtml(pageName) {
    scanHtmlFolder();
    log('Page: ' + pageName);
    return htmlContents[pageName + '.html'];
}
function processReq(req, res, printData)
{
    const body = [];
    req.on('data', (chunk) => {
        log('Receiving data...');
        body.push(chunk);
    });

    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        data = Object.fromEntries(
            parsedBody.split(/[=&]/).map(
                (v, i, a) => [i%2==0 ? v : a[i-1 > 0 ? i-1 : 0], i%2==1 ? v : a[i-1 > 0 ? i-1 : 0]]
            )
        );
        
        if (printData === true)
            log(`The Data: ${JSON.stringify(data)}`);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        
        // res.end();
    });
     return [];
}
// ---------------

module.exports = {
    log: log,
    loadHtml: loadHtml,
    processReq: processReq,
    processedData: data,
    refreshHtmlContents: scanHtmlFolder
};