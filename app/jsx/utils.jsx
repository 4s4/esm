import logLevel from 'loglevel';
var log = logLevel.getLogger("utils");
log.setLevel("INFO");

export const summarise = function(str, wordMax){
    if(str === null) return "";
    const descReg = /[^\s]+/g;
    const res = [...str.matchAll(descReg)];
    if(res.length > wordMax){
      return res.slice(0, wordMax).map(v => v[0]).join(' ')+' ...';
    }else{
      return str;
    }
  }

  export const look = function(m, t0){
    const t1 = performance.now();
    log.debug(`performance to do ${m} took: ` + (t1 - t0) + " milliseconds.");
    return t1;
  }
  