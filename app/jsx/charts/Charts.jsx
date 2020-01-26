export function pieChart(title, width, height, cat, dat, onClick, selections){
 return {
    title: {
        text: title
    },
    chart: {
        type: 'pie'
    },
    xAxis: {
      categories: cat
    },
    plotOptions: {
        series: {
            allowPointSelect: true
        }
    },
    series: [{
        cursor: 'pointer',
        point: {
            events: {
               click: function(e) {
                    onClick(e.point.options);
               }
           }
       },

      data: dat.map( (o, idx) => { 
        return {name: cat[idx], y: o.count, id: o.value, sliced: selections.find(s => s.value === o.value) !==undefined}})
    }]
  }
}

export function barChart(title, cat, dat, finder, onSelect){
    return {
        chart: {
            type: 'bar'
                },
        title: {
            text: title
        },    
        xAxis: {
          categories: cat
        },
        series: [{
          data: dat,
          name: 'TSM docs',
          point: {
            events: {
               click: function(e) {
                   const selection = finder(e.point.category);
                    console.log('bar chart click', selection);
                    onSelect(selection);
                }
            }
          }
        }]
      }
}


export function sunburstChart(title, d, drill, finder, onSelect){
    const serie = {
        type: "sunburst",
        data: d,
        point: {
            events: {
               click: function(e) {
                    if (drill){ 
                        const sector = finder(e.point.id);

                        console.log('sunburstChart', e.point, sector);
                        sector && onSelect(sector);
                    } else {
                        const type = finder(e.point.id);
                        console.log('sunburstChart',type);
                        type && onSelect('type', type);
                    }
                }
            }
          },
        cursor: 'pointer',
        dataLabels: {
            format: '{point.name}',
            filter: {
                property: 'innerArcLength',
                operator: '>',
                value: 16
            }
        },

    levels: [{
            level: 1,
            levelIsConstant: false,
            dataLabels: {
                filter: {
                    property: 'outerArcLength',
                    operator: '>',
                    value: 64
                }
            }
        }, {
            level: 2,
            colorByPoint: true
        },
        {
            level: 3,
            colorVariation: {
                key: 'brightness',
                to: -0.5
            }
        }, {
            level: 4,
            colorVariation: {
                key: 'brightness',
                to: 0.5
            }
        }]

    };
    if(drill){
        serie.allowDrillToNode=true;

    }
    return {
        chart: {
        },
        title: {
            text: title
        },
    
        series: [ serie
            ],
        tooltip: {
            headerFormat: "",
            pointFormat: 'Docs of <b>{point.name}</b> is <b>{point.value}</b>'
        }
    
      }
}