export default function wait(delay: number): Promise<void> {
  return new Promise((resolve: () => void) => {
    setTimeout(resolve, delay)
  })
}

export const cancellableWait = (delay: number): { wait: () => Promise<void>, cancel: () => void } => {
  let timeout: number;
  const wait = (): Promise<void> => {
    return new Promise((resolve) => {
      timeout = setTimeout(resolve, delay);
    })
  }

  const cancel = (): void => {
    timeout && clearTimeout(timeout);
  }

  return {
    wait,
    cancel,
  }
}