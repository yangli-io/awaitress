import wait from './wait'

export default class AsyncPolling {
  cb: () => void;
  ms: number;
  polling = false;
  started = false;

  constructor(cb: () => void, ms: number) {
    this.cb = cb;
    this.ms = ms;  
  }

  async poll(): Promise<void> {
    await this.cb();
    await wait(this.ms);

    if (this.polling) {
      this.poll();
    }
  }

  start() {
    if (!this.started) {
      this.started = true;
      this.polling = true;
      this.poll();
    } else {
      throw new Error('AsyncPolling cannot be started twice');
    }
  }

  stop() {
    if (this.started) {
      this.polling = false;
    }
  }
}