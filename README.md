# AWAITRESS

A small library to handle timeouts asynchronously

- [x] browsers
- [x] node.js

## Installation

```bash
npm install awaitress
```
or 
```bash
yarn add awaitress
```

## Wait
This is a simply converting setTimeout into asynchronous usage

```js
import { wait } from 'awaitress'

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
import { waitAtLeast } from 'awaitress'

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

## AsyncPolling

This can be used to polling APIs, this is different from normal polling.
Async polling will wait for your API to complete before starting the count down timer. 
This helps prevent queueing up too many polling requests if the first request takes too long.

```js
const fn = () => console.log('hello world');

const poll = new AsyncPolling(fn, 30000); // every 30 seconds

poll.start();

poll.pause();

poll.trigger(); // Calls the API and resets the timer, incase you need to prematurely call the API

poll.unpause();

poll.stop();
```

### Methods

#### poll.start()
Starts the poll, can only start once

#### poll.pause()
Pauses the poll, can use unpause to restart. The timer will continue but nothing is triggered

#### poll.trigger()
triggers the poll and resets the timer. Useful if you need an update after an action

#### poll.stop()
completely stops the poll and cannot be started again.