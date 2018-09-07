const createSplitter = (partSize) => {
  let parts = (str) => {
    let { length } = str;

    if (length <= partSize) {
      return [str];
    }

    let from = length - partSize;
    let to = length;

    return [str.slice(from, to)].concat(parts(str.slice(0, from)));
  };
  return parts;
};

export const amountOutput = (amount) => {
  const fractionDigits = Math.log(100) * Math.LOG10E;
  const isNegative = amount < 0;
  const valueAbs = Math.abs(amount);
  const valueAbsStr = (valueAbs / 100).toFixed(fractionDigits);
  const numberParts = valueAbsStr.split('.');
  const majorPart = numberParts[0];
  const minorPart = numberParts[1];
  const amountSplitter = createSplitter(3);
  const majorPartFormatted = amountSplitter(majorPart).reverse().join('');
  const formattedValueStr = majorPartFormatted + (minorPart ? `.${minorPart}` : '');

  return {
    value: Number(formattedValueStr),
    isNegative,
  };
}

/**
 * Преобразование числа из формата 100,10 в 10010
 * @param amount - сумма
 * @returns {number}
 */
export const amountInput = (amount) => {
  const sum = Number(amount) * 100;
  return Number(sum.toFixed(0));
};
