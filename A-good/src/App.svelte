<script>
  import "bulma/css/bulma.css";
  import { Input, Button } from "svelma";
  import { getPrimes } from "./getPrimes.js";
  import Timecode from "./timecode.svelte";
  import { thousandsizer } from "./helpers";

  let desiredFrameRate = 33;
  let clock = false;
  let computing = false;
  let clockStart = 0;
  let clockElapsed = 0;
  let computeElapsed = 0;
  window.intervalId = null;
  let primes = [];
  let to = 50000000; // fifty million

  $: if (computing === true) {
    const computeStart = performance.now();

    // this blocks execution main thread
    // browser freezes until getPrimes returns
    primes = getPrimes(to);
    // main thread continues execution

    const computeStop = performance.now();
    computeElapsed = computeStop - computeStart; // microseconds
    computing = false;
  }

  const tickTock = () => {
    if (clock) {
      setTimeout(function () {
        clockElapsed = performance.now() - clockStart;
        tickTock();
      }, desiredFrameRate);
    }
  };
</script>

<section class="section">
  <div class="container is-fluid">
    <h1 class="title">Main thread only</h1>
    <div class="field has-addons has-addons-left">
      <div class="control">
        <Input
          class="input"
          disabled
          type="text"
          value="Find prime numbers to" />
      </div>
      <div class="control">
        <Input class="input has-text-right" type="number" bind:value={to} />
      </div>
      <div class="control">
        <Button
          type="is-primary"
          active:computing
          on:click={() => (computing = !computing)}>
          <span class="fa fa-computer" />
          Compute
        </Button>
      </div>
    </div>

    <hr />

    <div class="notification is-secondary">
      {#if primes.length}
        <p>
          <strong>{thousandsizer(primes.length)}</strong>
          primes found in
          {Number(computeElapsed / 1000).toFixed(10)}
          seconds.
        </p>
      {/if}
    </div>

    <hr />

    <div class="columns is-mobile is-vcentered">
      <div class="column is-three-quarters">
        <Timecode bind:elapsed={clockElapsed} />
      </div>

      <div class="column is-one-quarter has-text-right">
        <div class="field">
          <Button
            type={clock ? 'is-warning' : 'is-light'}
            on:click={() => {
              clockStart = performance.now();
              clock = !clock;
              tickTock();
            }}>
            <span class="fa fa-clock" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>
