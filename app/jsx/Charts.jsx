export function pieChart(width, height, cat, dat){
 return {
    chart: {
        type: 'pie',
        height: height,
        width: width      
    },
    xAxis: {
      categories: cat
    },
    series: [{
      data: dat
    }]
  }
}

export function barChart(w, h, cat, dat){
    return {
        chart: {
            type: 'bar',
            height: h,
            width: w      
        },
        xAxis: {
          categories: cat
        },
        series: [{
          data: dat
        }]
      }
}

export function sunburstChart(h, w, d){
    return {
        chart: {
            height: h,
            width: w      
        },
        series: [{
            type: "sunburst",
            data: d,
            allowDrillToNode: true,
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
    
        }],
        tooltip: {
            headerFormat: "",
            pointFormat: 'Reports of <b>{point.name}</b> is <b>{point.value}</b>'
        }
    
      }
}