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
  