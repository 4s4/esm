export function findSector(uuid){
    //    const all = regions.reduce(( c, o ) => c.concat(o.options), []);
        return sectors.find( o => o.value === uuid);
    }