addEventListener("message", (event) => {
  const response = {
    cmd: event.data.cmd,
    payload: null,
  };

  switch (event.data.cmd) {
    default:
    case "hello":
      response.payload = "bonjour!";
      postMessage(response);
      break;
    case "getPrimes":
      const to = event.data.params.to || 100;
      const primes = getPrimes(to);
      response.payload = primes;
      postMessage(response);
      break;
  }
});

const getPrimes = (to) => {
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
