export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

export const getRandomInteger = (max: number): number => {
  return Math.floor(Math.random() * max);
}