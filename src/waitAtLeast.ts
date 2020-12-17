import wait from './wait';

export default function waitAtLeast(delay: number): () => Promise<boolean> {
  const startTime = +new Date();

  return async function waiting() {
    const now = +new Date();
    const timeDiff = (startTime + delay) - now;

    if (timeDiff < 0) {
      return true;
    }
    
    await wait(timeDiff);

    return true;
  }
}