var widgetise=
{
  config:function(w)
  {
    return [
      '<?xml version="1.0" encoding="utf-8"?>',
      '<widget defaultmode="application" network="public">',
      '  <widgetname>'+w.name+'</widgetname>',
      '  <description>'+w.title+'</description>',
      '  <icon>'+w.icon+'</icon>',
      '  <width>'+w.width+'</width>',
      '  <height>'+w.height+'</height>',
      '  <author><name>'+webserver.userName+'</name></author>',
      '</widget>'
    ].join("\n");
  },

  index:function(w)
  {
    return [
      '<!DOCTYPE html>',
      '<html xmlns="http://www.w3.org/1999/xhtml">',
      '  <head>',
      '    <title>'+w.title+'</title>',
      '    <style>html,body,iframe{ margin:0; padding:0; height:100%; width:100%; border:0; }</style>',
      '  </head>',
      '  <body>',
      '    <iframe src="'+w.url+'"></iframe>',
      '  </body>',
      '</html>'
    ].join("\n");
  },

  create:function(query, output)
  {
    var k,w={};
    for(k in query){ w[k]=query[k][0]; }

    this.icon(
      w,
      function(xicon)
      {
        w.icon='favicon.ico';

        var zip=new JSZip(),
            filename=w.name+'.wgt',
            stream=dir.resolve(filename).open(null, opera.io.filemode.WRITE);

        zip.add('config.xml', widgetise.config(w)).add('index.html', widgetise.index(w));
        if(xicon){ zip.add(w.icon, xicon); }

        stream.writeBase64( zip.generate() );
        stream.close();

        output(filename);
      }
    );
  },

  icon:function(w,cb)
  {
    var x=new XMLHttpRequest();

    if(!x.overrideMimeType){ console.log('Unite Widgetise Error: Binary AJAX ain\'t supported :('); cb(0); return; }

    x.open('get', w.icon, 0);
    x.overrideMimeType('text/plain;charset=x-user-defined');
    x.send(null);
    if( x.readyState==4 && '2002060'.indexOf(x.status)%3==0 ){ cb(window.btoa(x.responseText)); }
    else{ cb(0); } // probly a 404 or some such
  }
};
