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

  widget:function(r,filename){
    var widg=dir.resolve(filename);
    if(widg.exists){
      r.setResponseHeader('content-disposition','attachment;filename='+filename);
      output.file(widg,r,'application/x-opera-widgets',1);
    }
    r.close();
    
    /* give the user 2 minutes to click through the installation dialogues before deleting the widget installer */
    window.setTimeout(function(){dir.deleteFile(widg);},120000);
  }
};
