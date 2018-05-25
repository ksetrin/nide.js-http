минимальная версия node.js 8.11.2

git clone https://github.com/ksetrin/nide.js-http.git

команда для запуска node index.js

В командной строке ожидаемый результат

```req.method GET
response method GET
[ { id: '1',
    title: 'first title',
    text: 'first text',
    date_create: '1513759529',
    date_update: '1517259529' },
  { id: '2',
    title: 'second title',
    text: 'second text',
    date_create: '1513759529',
    date_update: '1517259529' } ]
req.method POST
response method POST
[ { id: '1',
    title: 'first title',
    text: 'first text',
    date_create: '1513759529',
    date_update: '1517259529' },
  { id: '2',
    title: 'second title',
    text: 'second text',
    date_create: '1513759529',
    date_update: '1517259529' },
  { title: 'next title',
    text: 'next text',
    id: '3',
    date_create: 1527224924536,
    date_update: 1527224924536 } ]
req.method DELETE
DELETE
response method DELETE
[ { id: '2',
    title: 'second title',
    text: 'second text',
    date_create: '1513759529',
    date_update: '1517259529' },
  { title: 'next title',
    text: 'next text',
    id: '3',
    date_create: 1527224924536,
    date_update: 1527224924536 } ]
req.method PATCH
PATCH
response method PATCH
[ { id: '2',
    title: 'replaced title',
    text: 'replaced text',
    date_create: '1513759529',
    date_update: 1527224926533 },
  { title: 'next title',
    text: 'next text',
    id: '3',
    date_create: 1527224924536,
    date_update: 1527224924536 } ]
```
