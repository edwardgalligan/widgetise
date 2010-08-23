var widgetise=
{
  config:function(w)
  {
    return [
      '<?xml version="1.0" encoding="utf-8"?>',
      '<widget defaultmode="application" network="public">',
      '  <widgetname>'+w.name+'</widgetname>',
      '  <description>'+w.title+'</description>',
      '  <width>'+w.screen.w+'</width>',
      '  <height>'+w.screen.h+'</height>',
      '  <author><name>'+opera.io.webserver.userName+'</name></author>',
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
  
  create:function(w)
  {
    var zip=new JSZip();
    var fname=w.name+'.wgt';
    var stream=dir.resolve(fname).open(null, opera.io.filemode.WRITE);
    var config=this.config(w);
    var index=this.index(w);

    zip.add('config.xml', config).add('index.html', index);

    stream.writeBase64( zip.generate() );
    stream.close();
    
    return fname;
  }
};
