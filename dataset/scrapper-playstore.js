var classeComentario = "UD7Dzf";
var holder = [];

Array
.from(document.getElementsByClassName(classeComentario))
.forEach(x => holder.push(x.innerText));

var set = new Set(holder);
set.forEach(x => console.log(x));