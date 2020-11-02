<script>
  export let elapsed = 0;
  import { niceTimeCode } from "./helpers.js";
</script>

<style>
  .timecode {
    font-family: monospace;
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.75);
  }
</style>

<div class="timecode">
  {@html niceTimeCode(elapsed)}
</div>
