themeColorTag = document.querySelector('meta[name=theme-color]');
var dark=localStorage.getItem("mdui-theme-layout-dark");
if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))
{
  themeColorTag.setAttribute("content", "#448AFF");
}
} else {
  if (dark) {
	themeColorTag.setAttribute("content", "#000000");
  } else {
    themeColorTag.setAttribute("content", "#FFFFFF");
  }
}

var elements = document.getElementsByClassName("material-icons");
for (var i = 0; i < elements.length; i++) {
  elements[i].style.visibility = "hidden";
}

window.onload=function(){
  var elements = document.getElementsByClassName("material-icons");
	for (var i = 0; i < elements.length; i++) {
	  elements[i].style.visibility = "visible";
	}
}
