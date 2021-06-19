import { cancellableWait } from './wait'

export default class AsyncPolling {
  private cb: () => void;
  private ms: number;
  private polling = false;
  private started = false;
  private paused = false;
  private cancelWait: () => void = () => {};

  constructor(cb: () => void, ms: number) {
    this.cb = cb;
    this.ms = ms;  
  }

  async poll(): Promise<void> {
    if (!this.paused) {
      await this.cb();
    }

    const { wait, cancel } = cancellableWait(this.ms);

    this.cancelWait = cancel;

    await wait();

    if (this.polling) {
      this.poll();
    }
  }

  pause() {
    this.paused = true;
  }

  unpause() {
    this.paused = false;
  }

  trigger() {
    this.cancelWait();

    this.poll();
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