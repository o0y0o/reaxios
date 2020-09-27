# @0y0/reaxios · [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/o0y0o/reaxios/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/@0y0/reaxios.svg)](https://www.npmjs.com/package/@0y0/reaxios) ![Package Status](https://github.com/o0y0o/reaxios/workflows/Package/badge.svg) ![Test Status](https://github.com/o0y0o/reaxios/workflows/Test/badge.svg)

`@0y0/reaxios` is a easy-to-use HTTP client based on [axios](https://github.com/axios/axios) for the browser and NodeJS.

## Installation

```sh
npm install @0y0/reaxios --save
```

```js
import Reaxios from '@0y0/reaxios'
```

As an alternative to using npm, you can use `@0y0/reaxios` as a `<script>` tag from a [CDN](https://unpkg.com/@0y0/request/dist/request.min.js).

```html
<script src="https://unpkg.com/@0y0/reaxios/dist/index.min.js"></script>
<script>Reaxios.get('http://...')</script>
```

## Usage

### Send a request

```js
Reaxios.get('/api')
Reaxios.post('/api')
Reaxios.put('/api')
Reaxios.delete('/api')
```

### Set HTTP header

```js
// headers: { foo: 'bar' }
Reaxios.get('/api').header('foo', 'bar')

// headers: { Authorization: 'bar' }
Reaxios.get('/api').auth('bar')

// headers: { Authorization: 'Bearer token' }
Reaxios.get('/api').bearer('token')

// headers: { foo1: 'bar1', Authorization: 'token' }
Reaxios.get('/api')
  .header('foo1', 'bar1')
  .header('foo2', undefined)
  .auth('token')
```

### Set URL parameters

```js
// url: /api/?foo=bar
Reaxios.get('/api').param('foo', 'bar')

// url: /api/?foo2=bar2
Reaxios.get('/api').param('foo1', undefined).param('foo2', 'bar2')

// url: /api/?foo1=bar1&foo2=bar2
Reaxios.get('/api').params({ foo1: 'bar1', foo2: 'bar2' })
```

### Set request body

```js
Reaxios.post('/api').body('content')

// Content-Type: application/json
Reaxios.post('/api').body({ foo: 'bar' })

// Content-Type: multipart/form-data
Reaxios.post('/api')
  .header('Content-Type', 'multipart/form-data')
  .body(new FormData())

// Content-Type: application/x-www-form-urlencoded;charset=UTF-8
Reaxios.post('/api')
  .header('Content-Type', 'application/x-www-form-urlencoded')
  .body(new URLSearchParams())
```

### Transform request and response

```js
Reaxios.post('/api')
  .body('data')
  // send `{ data: 'data' }` to server
  .transformRequest(data => ({ data }))
  // receive `{ data: 'data' }` from server and resolve promise with `'data'`
  .transformResponse(({ data }) => data)
```

### Cancel the request

```js
const promsie = async () => await Reaxios.post('/api').body('content')
promise.cancel()
```

## License

[MIT](https://github.com/o0y0o/reaxios/blob/master/LICENSE)
