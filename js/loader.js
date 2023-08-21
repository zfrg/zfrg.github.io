var loader = document.getElementById("loader");
document.body.style.overflow = 'hidden';
var fade = (function () {
  var timer;
  var i = 0;
  function change(tar) {
    i++;
    var num = 1 - i / 100;
	if (num != 0){
      loader.style.opacity = num;
	}else{
	  loader.parentNode.removeChild(loader);
	}
    if (i === tar) {
      clearTimeout(timer);
      return false;
    }
    timer = setTimeout(function () {
      change(tar);
    }, 1);
  }
  return change;
})();
window.onload=function(){
  document.body.style.overflow = 'visible';
  fade(0);
}
