var appDir=opera.io.filesystem.mountSystemDirectory('application'), dir=opera.io.filesystem.mountSystemDirectory('storage');

window.onload=function()
{
  var webserver=opera.io.webserver;
  if(webserver){ webserver.addEventListener('_index',index,0); webserver.addEventListener('css',output.css,0); }
};

function index(e){
  var response=e.connection.response;
  var request=e.connection.request;
  
  if(!e.connection.isLocal){ response.write('Sorry, this is a local application.'); response.close(); return; }

  if(request.queryItems.w)
  {
    output.widget( response, widgetise.create( JSON.parse(decodeURIComponent(request.queryItems.w[0])) ) );
  }else
  {
    output.page
    (
      response,
      'button',
      {
        uniteHostName:opera.io.webserver.hostName,
        unitePath:opera.io.webserver.currentServicePath,
        active:'base'
      }
    );
  }
}
