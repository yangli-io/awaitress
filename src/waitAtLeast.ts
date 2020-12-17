import wait from './wait';

export default function waitAtLeast(ms: number) {
  const startTime = +new Date();

  return async function waiting() {
    const now = +new Date();
    const timeDiff = (startTime + ms) - now;

    if (timeDiff < 0) {
      return true;
    }
    
    await wait(timeDiff);

    return true;
  }
}