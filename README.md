# AWAITRESS

A small library to handle timeouts asynchronously

## Installation

```bash
npm install
```
or 
```bash
yarn install
```

## Wait
This is a simply converting setTimeout into asynchronous usage

```js
async function doSomethingAfter10Seconds() {
  console.log('start');
  await wait(10000);

  console.log('end');
}
```

## waitAtLeast
This allows you to make sure at least a certain amount of time has elapsed before proceeding

In the example below, we make sure we do an action after waiting a minimum of 10 seconds but also after the httpRequest
```js
async function doSomethingAfter10Seconds() {
  console.log('start');

  const waitAtLeastTen = waitAtLeast(10000);

  await httpRequest();

  await waitAtLeastTen(10000);

  console.log('end')
}
```

This can also be achieved with a promise.all and just the wait function

```js
async function doSomethingAfter10Seconds() {
  console.log('start');

  const waitAtLeastTen = wait(10000);

  const http = httpRequest();

  await Promise.all([http, waitAtLeastTen]);

  console.log('end')
}
```

## TODO:
- Add a asynchronous polling mechanism