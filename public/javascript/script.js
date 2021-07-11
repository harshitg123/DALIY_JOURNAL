const wraping = document.querySelector('#Wraping');
const addMoreFields = document.querySelector('#btn-add');
const removeFields = document.querySelector('#btn-remove');
let inpName = 0;
const se = document.querySelector(".scrollToTop");

document.addEventListener('DOMContentLoaded', function() {
  
  se.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  addMoreFields.addEventListener("click", function() {
    let input_tags = wraping.getElementsByTagName('input');
    if (input_tags.length < 10) {
      inpName = inpName + 1;
      let newField = document.createElement('input');
      newField.setAttribute('type', 'text');
      newField.setAttribute('name', 'products[' + inpName + ']');
      newField.setAttribute('class', 'spacing form-control');
      newField.setAttribute('placeholder', 'Enter product URL_' + (inpName + 1));
      wraping.appendChild(newField);
    }
  });

  removeFields.addEventListener("click", function() {
    let input_tags = wraping.getElementsByTagName('input');
    if (input_tags.length > 1) {
      wraping.removeChild(input_tags[(input_tags.length - 1)])
      inpName = inpName - 1;
    }
  });
});
