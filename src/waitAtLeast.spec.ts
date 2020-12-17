import { expect } from 'chai'
import sinon from 'sinon'
import wait from './/wait'
import waitAtLeast from './waitAtLeast'

describe('waitAtLeast', () => {
  const spy = sinon.spy();

  async function callAfter100() {
    const waiter = waitAtLeast(100);

    await waiter();

    spy();
  }

  async function callAfterWait() {
    const waiter = waitAtLeast(100);

    await wait(200);

    await waiter();

    spy();
  }

  beforeEach(() => {
    spy.resetHistory();
  })

  it('should call after 100ms', (done) => {
    callAfter100();

    expect(spy.called).to.be.false;

    setTimeout(() => {
      expect(spy.called).to.be.false;
      setTimeout(() => {
        // after 110ms
        expect(spy.called).to.be.true;
        done();
      }, 60);
    }, 50);
  })

  it('should call after after waiting at least 100 but after all other async processes', (done) => {
    callAfterWait();

    expect(spy.called).to.be.false;

    setTimeout(() => {
      expect(spy.called).to.be.false;
      setTimeout(() => {
        // after 210ms
        expect(spy.called).to.be.true;
        done();
      }, 60);
    }, 150);
  })
});