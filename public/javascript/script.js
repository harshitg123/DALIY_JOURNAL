const se = document.querySelector(".scrollToTop");

se.addEventListener("click", function(){
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
})
