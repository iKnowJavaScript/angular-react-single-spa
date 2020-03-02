window.spa = {};

window.spa.counter = {
  count: 0,
  increaseCounter() {
    ++this.count;
    window.dispatchEvent(new Event("countIncreased"));
  }
};
