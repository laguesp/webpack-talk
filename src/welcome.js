export const getWelcomeMessage = (message) => {
  if (Math.random() > 0.75) {
    throw new Error('Yoo!')
  }

  return `We did it! ${message ?? ''}`
}