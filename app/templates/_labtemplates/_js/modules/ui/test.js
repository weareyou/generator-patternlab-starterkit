// define a new class
function YourClass($element) {
  // init class, i.e. store DOM elements
  this.$element = $element;
  // kick-off methods, i.e. add event handlers
  this.yourMethod();
}

YourClass.prototype.yourMethod = function yourMethod() {
  // DOM manipulation happens here
  this.$element.textContent = 'Component mounted';
};

export default ($element) => {
  // auto-invoke
  (() => new YourClass($element))();
};
