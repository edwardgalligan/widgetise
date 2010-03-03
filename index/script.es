var out=document.getElementById('msgout');
document.getElementById('msg').addEventListener('keyup',function(){
  var msg=encodeURIComponent(this.value)
  var x=new XMLHttpRequest();
  x.open('get','msg?msg='+msg,0);
  x.send(null);
},0);

//document.getElementById('ev').addEventListener('msg',function(e){ alert(e.data); //out.value=e.data; },0);

var source = new EventSource('sse');
source.onmessage = function (event) {
  alert(event.data);
};