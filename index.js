const http = require('http');
const port = 8080;

let state = [
    {
        id: '1',
        title: 'first title',
        text: 'first text',
        date_create: '1513759529',
        date_update: '1517259529'
    },
    {
        id: '2',
        title: 'second title',
        text: 'second text',
        date_create: '1513759529',
        date_update: '1517259529'
    }
];

const server = http.createServer((req, res) => {
    console.log('req.method', req.method);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {
        res.end(JSON.stringify(state));
    }
    if (req.method === 'POST') {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            try {
                json = JSON.parse(body);
                json.id = (state.length + 1).toString();
                json.date_create = Date.now();
                json.date_update = Date.now();
                state = state.concat(json);
                res.end(JSON.stringify(state));
            } catch (e) {
                console.log('Error parsing JSON!');
            }
        });
    }
    if (req.method === 'DELETE') {
        console.log('DELETE');
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            try {
                json = JSON.parse(body);
                state = state.filter((i) => i.id !== json.id);
                res.end(JSON.stringify(state));
            } catch (e) {
                console.log('Error parsing JSON!');
            }
        });
    }
    if (req.method === 'PATCH') {
        console.log('PATCH');
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            try {
                json = JSON.parse(body);
                state = state.map((i) => i.id === json.id ? {...i, ...json, ...{date_update: Date.now()}} : i);
                res.end(JSON.stringify(state));
            } catch (e) {
                console.log('Error parsing JSON!');
            }
        });
    }
}).listen(port);

http.get('http://127.0.0.1:8080/', (res) => getJson(res)).on('error', (err) => error(err));

setTimeout(function () {
    let payload = '{"title": "next title","text": "next text"}';
    let post_req = http.request({
        hostname: '127.0.0.1',
        port    : '8080',
        method  : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Length': Buffer.byteLength(payload)
        }
    }, (res) => getJson(res)).on('error', (err) => error(err));
    post_req.write(payload);
    post_req.end();
}, 1000);

setTimeout(function () {
    let payload = '{"id": "1"}';
    let post_req = http.request({
        hostname: '127.0.0.1',
        port    : '8080',
        method  : 'DELETE',
        headers : {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Length': Buffer.byteLength(payload)
        }
    }, (res) => getJson(res)).on('error', (err) => error(err));
    post_req.write(payload);
    post_req.end();
}, 2000);

setTimeout(function () {
    let payload = '{"id": "2", "title": "replaced title","text": "replaced text"}';
    let post_req = http.request({
        hostname: '127.0.0.1',
        port    : '8080',
        method  : 'PATCH',
        headers : {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Length': Buffer.byteLength(payload)
        }
    }, (res) => getJson(res)).on('error', (err) => error(err));
    post_req.write(payload);
    post_req.end();
}, 3000);

function getJson(res) {
    console.log('response method', res.req.method);
    let json = '';
    res.on('data', function (chunk) {
        json += chunk;
    });
    res.on('end', function () {
        if (res.statusCode === 200) {
            try {
                let data = JSON.parse(json);
                console.log(data);
            } catch (e) {
                console.log('Error parsing JSON!');
            }
        } else {
            console.log('Status:', res.statusCode);
        }
    });
};

function error (err) {
    console.log('Error:', err);
}