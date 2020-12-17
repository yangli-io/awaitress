export default function wait(delay: number): Promise<void> {
  return new Promise((resolve: () => void) => {
    setTimeout(resolve, delay)
  })
}