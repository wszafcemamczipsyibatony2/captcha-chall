function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return "";
}

var fontarr = ["font-family: courier new, sans-serif", 
               "font-family: comic sans, sans-serif", 
               "font-family: arial black, sans-serif",
			   "font-size: 150%",
			   "font-size: 50%"];

window.addEventListener('DOMContentLoaded', (event) => {
	let next_captcha = decodeURI(getCookie("captcha"));
	var output = "";
	let l = fontarr.length - 1;
	for (let i = 0; i < next_captcha.length; i++) {
		let fontchange = fontarr[Math.floor(((Math.random() * l) + 1)%l)];
		output += "<span style=\"" + fontchange + "\">" + next_captcha[i] + "</span>";
	}
    document.getElementById("captcha").innerHTML += `<b>Captcha</b>: ${output}`;
	document.getElementById("flag").innerText += `${decodeURI(getCookie("flag"))}`;
	if (document.getElementById("flag").innerText.length === 0 && getCookie("turn") !== ""){
		document.getElementById("turn").innerHTML = `Only <i>${1000-parseInt(decodeURI(getCookie("turn")))}</i> captchas to go`;
	} else if (document.getElementById("flag").innerText.length === 0) {
		document.getElementById("turn").innerHTML = `<i>1000</i> captchas to go`;
	}
});