function roundUpToCents(amount) {
  return Number(Math.ceil(amount * 100) / 100).toFixed(2);
}

export default roundUpToCents;
