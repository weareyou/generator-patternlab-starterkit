// define a new class
function YourClass($element) {
  // init class, i.e. store DOM elements,
  // kick-off methods, i.e. add event handlers
}

YourClass.prototype.yourMethod = function yourMethod() {
  // i.e. open-foldout logic
};

export default ($element) => {
  // auto-invoke
  (() => new YourClass($element))();
  // console.log('Component mounted on', $element);

  // logic here
  $element.textContent = 'Component mounted';

  // public component API
  $element.foo = () => {
    // console.log('foo called!');

    // dispatch events to notify other components
    $element.dispatchEvent(new CustomEvent('bar'));
  };

  // expose destroy method
  return () => {
    // restore content
    $element.textContent = '';

    // clean up methods
    $element.foo = undefined;
  };
};
