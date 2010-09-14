/**
 * App agnostic update script for unite.opera.com
 *
 * Usage:
 *  - Use widget.setPreferenceForKey('false','update'); to disable this script completely
 *    (as a toggle-able user preference for example)
 *
 *  - Script won't run if widget wasn't downloaded directly from the unite.opera.com site
 *    To override this limitation uncomment APP_ID below with the app number from the unite.opera.com url
 */

// uncomment to force updating:
//const APP_ID='000'

(function(){

var v,x,appID,oURL=widget.originURL.split('/');

if(typeof APP_ID!='undefined'){ appID=APP_ID; }else
if(oURL[2]=='unite.opera.com'){ appID=oURL[oURL.length-2]; }else
                              { widget.setPreferenceForKey('false','update'); }

if(widget.preferenceForKey('update')!=='false')
{
  x=new XMLHttpRequest();
  x.open('get','http://unite.opera.com/application/doap/'+appID)
  x.onreadystatechange=function()
  {
    if(x.readyState==4 && x.status==200)
    {
      v=x.responseXML.getElementsByTagName('revision')[0].textContent;
      if(v!=widget.version)
      {
        widget.showNotification
        (
          'New version out - click here to download',
          function(){ widget.openURL('http://unite.opera.com/application/download/'+appID+'/'+v+'/'); return false; }
        );
      }
    }
  };
  x.send(null);
}

})();