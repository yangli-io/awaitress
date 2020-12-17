import { expect } from 'chai'
import sinon from 'sinon'
import wait from './wait';

describe('wait', () => {
  const callSpy = sinon.spy();

  async function waitWrapper() {
    await wait(100);

    callSpy();
  }

  it('should wait 100ms', (done) => {
    waitWrapper();

    expect(callSpy.called).to.be.false;

    setTimeout(() => {
      expect(callSpy.called).to.be.false;
      setTimeout(() => {
        // after 110ms
        expect(callSpy.called).to.be.true;
        done();
      }, 60);
    }, 50);
  });
});