// define a new class
class YourClass {
  // init class, i.e. store DOM elements
  constructor($element) {
    this.$element = $element;
  }

  init() {
    // kick-off methods, i.e. add event handlers
    this.YourMethod();
  }

  YourMethod() {
    // DOM manipulation happens here
    this.$element.textContent = 'Component mounted';
  }
}

export default ($element) => {
  const inst = new YourClass($element);
  inst.init();
};
