var widgetise={

  config:function widgetConfig(w){
    //var stream=dir.open(dir.resolve(w.name+'.wgt/config.xml'),opera.io.filemode.WRITE);
    var data='<?xml version="1.0" encoding="utf-8"?>'+"\n"+
                 '<widget defaultmode="application" network="public">'+"\n"+
                 '  <widgetname>'+w.name+'</widgetname>'+"\n"+
                 '    <description>'+w.title+'</description>'+"\n"+
                 //'    <icon>icon.png</icon>'+"\n"+
                 '    <width>'+w.screen.w+'</width>'+"\n"+
                 '    <height>'+w.screen.h+'</height>'+"\n"+
                 '    <author><name>'+opera.io.webserver.userName+'</name></author>'+"\n"+
                 '  </widget>';
    
    //stream.write(data);
    //stream.close();
    return data;
  },

  index:function(w){
    //var stream=dir.open(dir.resolve(w.name+'.wgt/index.html'),opera.io.filemode.WRITE);
    var data='<!DOCTYPE html>'+"\n"+
                 '<html><head><title>'+w.title+'</title>'+
                 //'<link rel="icon" href="'+w.icon+'"/>'+
                 '<style>html,body,iframe{margin:0;padding:0;height:100%;width:100%;border:0;}</style></head>'+
                 '<body><iframe src="'+w.url+'"></iframe></body></html>';
    
    //stream.write(data);
    //stream.close();
    return data;
  },
  
  create:function(w){
    // not working since native zip write broke in Opera 10.6+
    //var t=appDir.resolve('template.zip');
    //if(t.exists){ t.copyTo(dir.resolve(w.name+'.wgt'),1); this.config(w); this.index(w); /*this.icon(w.icon,w.name);*/ return w.name+'.wgt'; }
    
    // new way using jszip library instead of native zip write
    var zip=new JSZip();
    var fname=w.name+'.wgt';
    var stream=dir.resolve(fname).open(null,opera.io.filemode.WRITE);
    zip.add('config.xml',this.config(w)).add('index.html',this.index(w));

    stream.writeBase64( zip.generate() );
    stream.close();
    
    return fname;
    //return zip.generate();
  }

  /* not working because writeImage does nothing
  icon:function(url,wname){
    var icon=new Image();
    icon.src=url;
    var stream=dir.open(dir.resolve(wname+'.wgt/icon.png'),opera.io.filemode.WRITE);
    stream.writeImage(icon);
    stream.close();
  }//*/
};
