
export function findRegion(uuid){
    const all = regions.reduce(( c, o ) => c.concat(o.options), []);
    return all.find( o => o.value === uuid);
}