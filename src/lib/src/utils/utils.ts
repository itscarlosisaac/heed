function generateUUID(suffix: string = 'hd'): string {
  const xxx = ((Math.random() * 0xfff) | 0).toString(16).padStart(3, '0')
  const xxxx = ((Math.random() * 0xffff) | 0).toString(16).padStart(4, '0')
  return `${suffix}-${xxx}-${xxxx}`
}

export { generateUUID }
