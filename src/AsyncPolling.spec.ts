import { expect } from 'chai'
import sinon from 'sinon'
import wait from './wait'
import AsyncPolling from './AsyncPolling'

describe('AsyncPolling', () => {
  it('should call 3 times and stop', async () => {
    const fn = sinon.spy();

    const poll = new AsyncPolling(fn, 30);

    poll.start();

    await wait(5)

    expect(fn.callCount).to.equal(1)

    await wait(30)

    expect(fn.callCount).to.equal(2)

    await wait(30)

    expect(fn.callCount).to.equal(3)

    poll.stop();

    await wait(50)

    expect(fn.callCount).to.equal(3)

    poll.stop()
  })

  it('should handle triggering', async () => {
    const fn = sinon.spy();

    const poll = new AsyncPolling(fn, 30);

    poll.start();

    await wait(70);

    expect(fn.callCount).to.equal(3);

    poll.trigger();

    await wait(5);

    poll.trigger();

    await wait(5);

    expect(fn.callCount).to.equal(5);

    await wait(20);

    expect(fn.callCount).to.equal(5); // because timer has been reset

    poll.stop();
  })

  it('should be able to pause and unpause', async () => {
    const fn = sinon.spy();
    
    const poll = new AsyncPolling(fn, 30);

    poll.start();

    await wait(5)

    expect(fn.callCount).to.equal(1)

    poll.pause();

    await wait(100)

    poll.unpause();

    expect(fn.callCount).to.equal(1)

    await wait(30);

    expect(fn.callCount).to.equal(2)

    poll.stop()
  })
})