var output={
  file:function(file,response,mime,c){
    if(file.exists){
      response.setResponseHeader('content-type',mime);
      response.writeFile(file);
    }
    if(c){ response.close(); }
  },

  page:function(r,content){
    this.file(appDir.resolve('index/header.xhtml'),r,'application/xhtml+xml',0);
    r.write(content);
    r.write('</body></html>');
    r.close();
  },

  css:function(e){ output.file(appDir.resolve('index/styles.css'),e.connection.response,'text/css',1); },

  es:function(e){ output.file(appDir.resolve('index/script.es'),e.connection.response,'application/ecmascript',1); },
  
  widgetise:function(r,filename){
    var widg=dir.resolve(filename);
    if(widg){ output.file(widg,r,'application/x-opera-widgets',1); }else{ r.close(); dir.deleteDirectory(widg,1); }
  }
};