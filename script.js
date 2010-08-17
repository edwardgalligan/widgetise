var appDir=opera.io.filesystem.mountSystemDirectory('application'), dir=opera.io.filesystem.mountSystemDirectory('storage');

window.onload=function(){
  var webserver=opera.io.webserver;
  if(webserver){ webserver.addEventListener('_index',index,0); webserver.addEventListener('css',output.css,0); }
};

function index(e){
  var response=e.connection.response;
  var request=e.connection.request;
  
  if(!e.connection.isLocal){ response.write('Sorry, this is a local application.'); response.close(); return; }

  if(request.queryItems.w){
    output.widget( response, widgetise.create( JSON.parse(decodeURIComponent(request.queryItems.w[0])) ) );
  }else{
    output.page(
      response,
      '<div id="faketoolbar">'+"\n"+
        '<a class="button" title="WIDGETISE" href="opera:/button/Go%20to%20page,%20%22'+
          'javascript:'+
            '(function(obj,s){'+
              "obj.name=prompt('Widgetname:');"+
              'obj.title=document.title;'+
              'obj.screen={w:window.screen.width,h:window.screen.height};'+
              'obj.url=location.href;'+
              "obj.icon=location.protocol+'//'+document.domain+'/favicon.ico';"+
              "location.href='http://"+opera.io.webserver.hostName+opera.io.webserver.currentServicePath+"?w='+encodeURIComponent(JSON.stringify(obj));"+
            '})({},{});'+
        '%22,1,,%22Panel%20Widgets%22">WIDGETISE</a>'+"\n"+
      '</div>'+"\n"
    );
  }
}
