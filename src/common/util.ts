export const toDateFormat = (date: string | null) => {
  if (date) return date.replace(/(\d{4})(\d{2})/, '$1-$2');
};

export const toAmountFormat = (amount: number) => {
  return String(amount).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
};

export const compareYearMonth = (a: number[], b: number[]): (1 | 0 | -1) => {
  if (a[0] > b[0]) return 1;
  else if (a[0] < b[0]) return -1;
  else {
    if (a[1] > b[1]) return 1;
    else if (a[1] < b[1]) return -1;
    else return 0;
  }
};

export const accordionMotion = (target: HTMLElement, startValue: number, endValue: number, duration: number, callback?: () => void) => {
  let startTime: number | null = null;
  let loopFunc = (timeStamp: number) => {
    if (!startTime) startTime = timeStamp;
    if (timeStamp - startTime < duration) {
      const progress = (timeStamp - startTime) / duration;

      target.style.height = `${startValue + (endValue - startValue) * +progress.toFixed(2)}px`;
      requestAnimationFrame(loopFunc);
    } else {
      target.style.height = `${endValue}px`;
      if (callback) callback();
    }
  }
  requestAnimationFrame(loopFunc)
};