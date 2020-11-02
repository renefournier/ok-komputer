export const getPrimes = (to) => {
  var sieve = [],
    i,
    j,
    primes = [];
  for (i = 2; i <= to; ++i) {
    if (!sieve[i]) {
      // i has not been marked -- it is prime
      primes.push(i);
      for (j = i << 1; j <= to; j += i) {
        sieve[j] = true;
      }
    }
  }
  return primes;
};
