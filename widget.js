var widgetise={

  config:function widgetConfig(w){
    var stream=dir.open(dir.resolve(w.name+'.wgt/config.xml'),opera.io.filemode.WRITE);
    stream.write('<?xml version="1.0" encoding="utf-8"?>'+"\n"+
                 '<widget defaultmode="application" network="public">'+"\n"+
                 '  <widgetname>'+w.name+'</widgetname>'+"\n"+
                 '    <description>'+w.title+'</description>'+"\n"+
               //'    <icon>'+w.icon+'</icon>'+"\n"+
                 '    <width>'+w.screen.w+'</width>'+"\n"+
                 '    <height>'+w.screen.h+'</height>'+"\n"+
                 '    <author><name>'+opera.io.webserver.userName+'</name></author>'+"\n"+
                 '  </widget>');
    stream.close();
  },

  index:function(w){
    var stream=dir.open(dir.resolve(w.name+'.wgt/index.html'),opera.io.filemode.WRITE);
    stream.write('<!DOCTYPE html>'+"\n"+
                 '<html><head><title>'+w.title+'</title>'+"\n"+
                 '<link rel="icon" href="'+w.icon+'"/>'+
                 '<style>html,body,iframe{margin:0;padding:0;height:100%;width:100%;border:0;}</style></head>'+"\n"+
                 '<body><iframe src="'+w.url+'"></iframe></body></html>');
    stream.close();
  },
  
  create:function(t,w){ if(t.exists){ t.copyTo(dir.resolve(w.name+'.wgt'),1); this.config(w); this.index(w); return w.name+'.wgt'; } }

};