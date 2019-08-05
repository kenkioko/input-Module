import { host } from './variables.js';

$(function() {

  if (host.dynamic_url) {
    host.url = location.origin + location.pathname;
    
    if( host.url[host.url.length - 1] === "/" ){
      host.url = host.url.substring(0, host.url.length - 1);
    }
  }

});
