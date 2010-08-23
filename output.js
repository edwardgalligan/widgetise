const _READ=opera.io.filemode.READ;

var output=
{
  file:function(file, response, mime, closeConn)
  {
    if(file.exists)
    {
      response.setResponseHeader('content-type', mime);
      response.writeFile(file);
    }
    if(closeConn){ response.close(); }
  },

  page:function(r, file, template)
  {
    template.content=this.template(appDir.resolve('index/'+file+'.xhtml'), template);

    r.setResponseHeader('content-type','application/xhtml+xml');
    r.write( this.template(appDir.resolve('index/page.xhtml'), template) );
    r.close();
  },

  template:function(file, t)
  { 
    var text=file.open(null, _READ).read(file.fileSize, 'utf-8');
    for(var k in t){ text=text.replace('{{'+k+'}}', t[k]); } 
    return text;
  },

  css:function(e){ output.file(appDir.resolve('index/styles.css'), e.connection.response,'text/css',1); },

  widget:function(r, filename)
  {
    var widg=dir.resolve(filename);
    if(widg.exists)
    {
      r.setResponseHeader('content-disposition', 'attachment;filename='+filename);
      output.file(widg, r, 'application/x-opera-widgets', 1);
    }
    r.close();

    /* give the user 2 minutes to click through the installation dialogues before deleting the widget installer */
    window.setTimeout(function(){ dir.deleteFile(widg); }, 120000);
  }
};