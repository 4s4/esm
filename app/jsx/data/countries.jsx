export function findCountry(uuid){
//    const all = regions.reduce(( c, o ) => c.concat(o.options), []);
    return countries.find( o => o.value === uuid);
}