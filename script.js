var appDir=opera.io.filesystem.mountSystemDirectory('application'), dir=opera.io.filesystem.mountSystemDirectory('storage'), webserver=opera.io.webserver;

window.onload=function()
{
  if(webserver)
  {
    webserver.addEventListener('_index',index,0);
    webserver.addEventListener('new',_new,0);
  }
};

function index(e){ widgetisePage(e, 'base'); }
function _new(e){ widgetisePage(e, 'new'); }

function widgetisePage(e, page)
{
  var response=e.connection.response, request=e.connection.request;

  if(!e.connection.isLocal){ response.write('Sorry, this is a local application.'); response.close(); return; }

  if(request.queryItems.w){ widgetise.create( request.queryItems.w[0], function(w){ output.widget(response, w); } ); }
  else{ output.page( response, page ); }
}