export const thousandsizer = (x) => {
  if (!x) return "";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const niceTimeCode = (ms) => {
  const seconds = ms / 1000;
  const currentTime = new Date(seconds * 1000).toISOString().substr(11, 10);
  const currentFrame = String(
    `0${Math.floor((seconds - Math.floor(seconds)) * 30)}`,
  ).substr(-2);
  // return `${currentTime}:${currentFrame}`;
  return `<span class="fa fa-sm fa-clock subtle"></span> ${currentTime}s : <span class="fa fa-sm fa-film subtle"></span> ${currentFrame}`;
};

export const niceTime = (ms) => {
  const currentTime = new Date(ms).toISOString().substr(11, 10);
  const currentFrame = String(`0${Math.floor(((ms / 1000) % 1) * 30)}`).substr(
    -2,
  );
  return `${currentTime}s:${currentFrame}`;
};
