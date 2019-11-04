    var parms = [];
    var languageId = 1;
    var instanceId = 1;
    
String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

var searchReports = function(search, callback) {
    $.ajax({
        url: './handlers/MarketplaceReportSearchHandler.ashx',
        data: { language: languageId, instance: instanceId, search: JSON.stringify(search) },
        success: function (d) {
            if (callback) callback(d);
        },
        dataType: 'json',
        type: 'POST'
    });
}

var getStandardResults = function (reportId, standardId, profileId, callback) {
    $.ajax({
        url: './handlers/MarketplaceSeriesDataHandler.ashx',
        data: { report: reportId, standard: standardId, profile: profileId },
        success: function (d) {
            if (callback) callback(d);
        },
        dataType: 'json',
        type: 'POST'
    });
}

var getCompanyDetails = function (companyId, profileId, languageId, callback) {
    $.ajax({
        url: './handlers/MarketplaceCompanyDetailsHandler.ashx',
        data: { company: companyId, profile: profileId, language: languageId },
        success: function (d) {
            if (callback) callback(d);
        },
        dataType: 'json',
        type: 'POST'
    });
}

$(function () {
    $('.form-group select').selectize({ clearOnOpen: true }).on('change', filterSearch);
    $('#CompanyName').on('change', filterSearch);
    $('#Filters input.percentslider')
    .slider({tooltip: 'show',selection: 'after', orientation: 'horizontal', step: 5, min: -1, max: 100, value: -1})
    .on('slide', function(ev){ $(ev.currentTarget).closest('.percentageFilter').find('span.percentage').text(-1 < ev.value ? ev.value + '%' : 'na');})    
    .on('slideStop', filterSearch)
    .closest('.percentageFilter')
    .append('<span class="percentage">na</span>');
    filterSearch();
});

function max(a, b)
{
    if (!a || !isNumber(a)) return b;
    if (!b || !isNumber(b)) return a;
    return Math.max(a, b);
}
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function filterSearch() {
    var fs = {};
    fs.CompanyName = '';
    fs.Products = [];
    fs.ProductCategories = []
    fs.ProducingCountries = [];
    fs.ProducingRegions = [];
    fs.StandardsCertified = []
    fs.StandardsAssessed = [];
    fs.Compliance = {};
    fs.Compliance.Overall = max(-1, $('#overallPercentage').val());
    fs.Compliance.Environment = max(-1, $('#environmentPercentage').val());
    fs.Compliance.Social = max(-1, $('#sociallPercentage').val());
    fs.Compliance.Economic = max(-1, $('#economicPercentage').val());
    fs.Compliance.Quality = max(-1, $('#qualityPercentage').val());
    fs.Compliance.BusinessIntegrity = max(-1, $('#businessIntegrityPercentage').val());

    var sd;
    sd = $('#CompanyName').val();
    if (sd && 0 < sd.length) {
        fs.CompanyName = sd;
    }
    sd = $('#DropDownProduct').val();
    if (sd && 0 < sd.length) {
        sd.forEach(function (o, i) {
            var p = o.split(':')[2];
            if (p && 0 < p) fs.Products.push(p);
            else fs.ProductCategories.push(o.split(':')[0]);
        });
    }
    sd = $('#DropDownProducingCountry').val();
    if (sd && 0 < sd.length) {
        sd.forEach(function (o, i) {
            var p = o.split(':')[1];
            if (p && 0 < p) fs.ProducingCountries.push(p);
            else fs.ProducingRegions.push(o.split(':')[0]);
        });
    }
    sd = $('#StandardsCertifiedList').val();
    if (sd && 0 < sd.length) {
        sd.forEach(function (o, i) {
            fs.StandardsCertified.push(o);
        });
    }
    sd = $('#StandardsAssessedList').val();
    if (sd && 0 < sd.length) {
        sd.forEach(function (o, i) {
            fs.StandardsAssessed.push(o);
        });
    }

    searchReports(fs, buildResultsTable);
}

var buildResultsTable = function (d) {
    var results_container = $('#ResultsTable tbody');
    var standard_template = '<span class="standard" data-id="{0}" data-name="{1}" data-logolarge="{3}"><a href="marketplace.aspx#"><img src="http://search.standardsmap.org:8080/{2}" title="{1}" width="45" height="45" /></a></span>';
    var row_template = '<tr class="report_result" data-id="{0}"><td class="company"><a href="marketplace.aspx#">{1}</a></td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td><a href="http://search.standardsmap.org:8080/reportfinal.aspx?report={0}">View</a></td></tr>';
    var report_template = '<tr class="standard_result" data-id="{0}" id="{3}-{0}"><td colspan="6"><span class="standard_title"><img src="http://search.standardsmap.org:8080/{2}" width="90" height="90" /><h4>{1}</h4></span><span id="data-{3}-{0}"></span></td></tr>';
    var company_template = '<tr class="company_result" data-id="{0}" id="{1}-{0}"><td colspan="6"><span id="company-{1}-{0}"></span></td></tr>';
    results_container.empty();
    if (d) {
        var rpt_list = [];
        d.forEach(function (r, i) {
                rpt_list.push(r.ReportID);
                var standards = '';
                if (r.Standards) {
                    r.Standards.forEach(function (s, i) { standards += standard_template.format(s.Id, s.Name, s.LogoSmall, s.LogoLarge); });
                }
                var row = $(row_template.format(r.ReportID, r.CompanyName, r.Product, r.Country, standards, formatDate(fixJsonDate(r.Modified))));
                row.find('td.company a').on('click', function (ev) {
                    ev.preventDefault();
                    var result = $(ev.currentTarget).closest('.report_result');
                    var cmp_row = results_container.find('#' + r.ReportID + '-' + r.CompanyID + '.company_result');
                    // does the row exist? if so toggle visibility
                    if (cmp_row.length) {
                        cmp_row.toggle();
                    }
                    else {
                        cmp_row = result.after(company_template.format(r.CompanyID, r.ReportID));
                        getCompanyDetails(r.CompanyID, 0, 1, function (d) {
                             showCompanyDetails(d, '#company-' + r.ReportID + '-' + r.CompanyID);
                        });
                    }
                });
                results_container.append(row);
            });   
        results_container.find('.standard a').on('click', function (ev) {
            ev.preventDefault();
            var std = $(ev.currentTarget).closest('.standard');
            var result = std.closest('.report_result');
            var id = std.attr('data-id');
            var name = std.attr('data-name');
            var logo = std.attr('data-logolarge');
            var rid = result.attr('data-id');
            var std_row = results_container.find('#' + rid + '-' + id + '.standard_result');
            // does the row exist? if so toggle visibility
            if (std_row.length) {
                std_row.toggle();
            }
            else {
                var cmp_row = result.next('.company_result');
                if (cmp_row.length) {
                    std_row = cmp_row.after(report_template.format(id, name, logo, rid));
                }
                else {
                    std_row = result.after(report_template.format(id, name, logo, rid));
                }
                getStandardResults(rid, id, 0, function (d) {
                     showStandardResults(d.Data, '#data-' + rid + '-' + id);
                });
            }
        });
        $('#ReportIDs').val(rpt_list.join(','));
    }
}

var fixJsonDate = function (dt) {
    var date = new Date(parseInt(dt.replace(/[^0-9 +]/g, '')));
    return date;
}
var formatDate = function (d) {
    var dd = d.getDate();
    if ( dd < 10 ) dd = '0' + dd;
    var mm = d.getMonth()+1;
    if ( mm < 10 ) mm = '0' + mm;
    var yy = d.getFullYear() % 100;
    if ( yy < 10 ) yy = '0' + yy;
    return dd+'/'+mm+'/'+yy;
}

var showCompanyDetails = function (d, el) {
    var template = '<span class="standard_title"><img src="http://search.standardsmap.org:8080/{5}" width="90" height="90"><h4>{1}</h4></span><span class="company_details"><p class="lead">{2}</p><p>Products/Services: {6}<br />Destination markets: {7}</p><p>Contact: <a href="mailto:{4}">{4}</a><br />Website: <a href="http://search.standardsmap.org:8080/{3}" target="_blank">{3}</a></p></span>{8}';
    var standards = '';
    var standard_template = '<span class="standard" data-id="{0}" data-name="{1}" data-logolarge="{3}"><img src="http://search.standardsmap.org:8080/{2}" title="{1}" alt="{1}" width="45" height="45" /></span>';
    if (d.Standards) {
        standards = '<span class="standards_certified">';
        d.Standards.forEach(function (s, i) { standards += standard_template.format(s.Id, s.Name, s.LogoSmall, s.LogoLarge); });
        standards += '</span>';
    }
    $(el).append(template.format(d.Id, d.Name, d.Description, d.Website, d.ContactEmail, d.Logo, d.Products, d.DestinationMarkets, standards));
}

var showStandardResults = function (d, el) {
    //var overview_template = '<table class="table overview_table"><thead><tr><th>Overall</th><th>Environment</th><th>Social</th><th>Economic</th><th>Quality management</th><th>Ethics</th></tr></thead><tbody><tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td></tr></tbody></table>';
    var overview_template = '<table class="overview_table"><caption>Latest compliance assessment {6}</caption><thead><tr class="hotspot-background-colors"><th class=""><i>∑</i>Overall</th><th class="hotspot-environment "><i class="icon-sm-environment"></i> Environment</th><th class="hotspot-social "><i class="icon-sm-social"></i> Social</th><th class="hotspot-economic "><i class="icon-sm-economic"></i> Economic</th><th class="hotspot-quality-management"><i class="icon-sm-quality"></i> Quality</th><th class="hotspot-ethics"><i class="icon-sm-ethics"></i> Ethics</th></tr></thead><tfoot><tr><td colspan="6">Met: {7} Nearly: {8} Missed: {9} Total: {10}</td></tr></tfoot><tbody><tr class="hotspot-background-colors"><td>{0}%</td><td class="hotspot-environment ">{1}%</td><td class="hotspot-social ">{2}%</td><td class="hotspot-economic ">{3}%</td><td class="hotspot-quality-management">{4}%</td><td class="hotspot-ethics">{5}%</td></tr></tbody></table>';
    var nd = d[d.length - 1];
    var history_template = '<table class="table history_table"><thead><tr><th>Date</th><th>Overall</th><th>Environment</th><th>Social</th><th>Economic</th><th>Quality</th><th>Ethics</th></tr></thead><tbody>{0}</tbody></table>';
    var history_row_template = '<tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td>{6}</td></tr>';
    var html = '';
    var seriesOv = { name: 'Overall', data: [] };
    var seriesEn = { name: 'Environmental', data: [] };
    var seriesSc = { name: 'Social', data: [] };
    var seriesEc = { name: 'Economic', data: [] };
    var seriesQm = { name: 'Quality', data: [] };
    var seriesEt = { name: 'Ethics', data: [] };
    for (var i = d.length - 1; i > -1; --i) {
        var date = fixJsonDate(d[i].DateCreated);
        var datestring = formatDate(date);
        var datadate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
        html += history_row_template.format(datestring, d[i].Ranking, d[i].RankingEnvironmental, d[i].RankingSocial, d[i].RankingEconomic, d[i].RankingQualitymanagement, d[i].RankingEthics);
        seriesOv.data.push([datadate, d[i].Ranking]);
        seriesEn.data.push([datadate, d[i].RankingEnvironmental]);
        seriesSc.data.push([datadate, d[i].RankingSocial]);
        seriesEc.data.push([datadate, d[i].RankingEconomic]);
        seriesQm.data.push([datadate, d[i].RankingQualitymanagement]);
        seriesEt.data.push([datadate, d[i].RankingEthics]);
    }
    $(el).append(history_template.format(html));
    var uid = "{0}-{1}".format(nd.StandardId, nd.UserReportId);
    $(el).append('<div class="history_graph" id="graph-' + uid + '"></div>');
    $(el).append(overview_template.format(
          nd.Ranking.toFixed(0)
        , nd.RankingEnvironmental.toFixed(0)
        , nd.RankingSocial.toFixed(0)
        , nd.RankingEconomic.toFixed(0)
        , nd.RankingQualitymanagement.toFixed(0)
        , nd.RankingEthics.toFixed(0)
        , formatDate(fixJsonDate(nd.DateCreated))
        , nd.NumberPass
        , nd.NumberAlmost
        , nd.NumberFail
        , nd.NumberPass + nd.NumberAlmost + nd.NumberFail
    ));
    $('#graph-' + uid).highcharts({
        chart: {
            zoomType: 'x',
            type: 'line'
        },
        colors : [
           '#36A7E9',
           '#95a644',
           '#636363',
           '#172944',
           '#C1413B',
           '#8F0063',
           '#424884',
           '#789C3C',
           '#5695AF'
        ],
        title: {
            text: 'Compliance history'
        }/*,
        subtitle: {
            text: 'Progress over time'
        }*/,
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
				second: '%Y-%m-%d',
				minute: '%Y-%m-%d',
				hour: '%Y-%m-%d',
				day: '%Y %m-%d',
				week: '%Y %m-%d',
				month: '%Y-%m',
				year: '%Y'
			}/*,
            title: {
                text: 'Date'
            }*/
        },
        yAxis: {
            title: {
                text: 'Compliance (%)'
            },
            min: 0,
            max: 100
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.0f} %'
        },
        series: [seriesOv,seriesEn,seriesSc,seriesEc,seriesQm,seriesEt]
    });
}

$(function () {

    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=world-population-history.csv&callback=?', function (csv) {

        // Parse the CSV Data
        /*Highcharts.data({
            csv: data,
            switchRowsAndColumns: true,
            parsed: function () {
                console.log(this.columns);
            }
        });*/

        // Very simple and case-specific CSV string splitting
        function CSVtoArray(text) {
            return text.replace(/^"/, '')
                .replace(/",$/, '')
                .split('","');
        };

        csv = csv.split(/\n/);

        var countries = {},
            mapChart,
            countryChart,
            numRegex = /^[0-9\.]+$/,
            quoteRegex = /\"/g,
            categories = CSVtoArray(csv[1]).slice(4);

        // Parse the CSV into arrays, one array each country
        $.each(csv.slice(2), function (j, line) {
            var row = CSVtoArray(line),
                data = row.slice(4);

            $.each(data, function (i, val) {
                
                val = val.replace(quoteRegex, '');
                if (numRegex.test(val)) {
                    val = parseInt(val);
                } else if (!val) {
                    val = null;
                }
                data[i] = val;
            });
            countries[row[1]] = {
                name: row[0],
                code3: row[1],
                data: data
            };
        });

        // For each country, use the latest value for current population
        var data = [];
        for (var code3 in countries) {
            var value = null,
                year,
                itemData = countries[code3].data,
                i = itemData.length;

            while (i--) {
                if (typeof itemData[i] === 'number') {
                    value = itemData[i];
                    year = categories[i];
                    break;
                }
            }
            data.push({
                name: countries[code3].name,
                code3: code3,
                value: value,
                year: year
            });
        }
        
        // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
        var mapData = Highcharts.geojson(Highcharts.maps['custom/world']);
        $.each(mapData, function () {
            this.id = this.properties['hc-key']; // for Chart.get()
            this.flag = this.id.replace('UK', 'GB').toLowerCase();
        });

        // Wrap point.select to get to the total selected points
        Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {

            proceed.apply(this, Array.prototype.slice.call(arguments, 1));

            var points = mapChart.getSelectedPoints();

            if (points.length) {
                if (points.length === 1) {
                    $('#info #flag').attr('class', 'flag ' + points[0].flag);
                    $('#info h2').html(points[0].name);
                } else {
                    $('#info #flag').attr('class', 'flag');
                    $('#info h2').html('Comparing countries');

                }
                $('#info .subheader').html('<h4>Historical population</h4><small><em>Shift + Click on map to compare countries</em></small>')

                if (!countryChart) {
                    countryChart = $('#country-chart').highcharts({
                        chart: {
                            height: 250,
                            spacingLeft: 0
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: null
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            tickPixelInterval: 50,
                            crosshair: true
                        },
                        yAxis: {
                            title: null,
                            opposite: true
                        },
                        tooltip: {
                            shared: true
                        },
                        plotOptions: {
                            series: {
                                animation: {
                                    duration: 500
                                },
                                marker: {
                                    enabled: false
                                },
                                threshold: 0,
                                pointStart: parseInt(categories[0]),
                            }
                        }
                    }).highcharts();
                }

                $.each(points, function (i) {
                    // Update
                    if (countryChart.series[i]) {
                        /*$.each(countries[this.code3].data, function (pointI, value) {
                            countryChart.series[i].points[pointI].update(value, false);
                        });*/
                        countryChart.series[i].update({
                            name: this.name,
                            data: countries[this.code3].data,
                            type: points.length > 1 ? 'line' : 'area'
                        }, false);
                    } else {
                        countryChart.addSeries({
                            name: this.name,
                            data: countries[this.code3].data,
                            type: points.length > 1 ? 'line' : 'area'
                        }, false);
                    }
                });
                while (countryChart.series.length > points.length) {
                    countryChart.series[countryChart.series.length - 1].remove(false);
                }
                countryChart.redraw();

            } else {
                $('#info #flag').attr('class', '');
                $('#info h2').html('');
                $('#info .subheader').html('');
                if (countryChart) {
                    countryChart = countryChart.destroy();
                }
            }

            

        });
        
        // Initiate the map chart
        mapChart = $('#container').highcharts('Map', {
            
            title : {
                text : 'Population history by country'
            },

            subtitle: {
                text: 'Source: <a href="http://data.worldbank.org/indicator/SP.POP.TOTL/countries/1W?display=default">The World Bank</a>'
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            colorAxis: {
                type: 'logarithmic',
                endOnTick: false,
                startOnTick: false,
                min: 50000
            },

            tooltip: {
                footerFormat: '<span style="font-size: 10px">(Click for details)</span>'
            },

            series : [{
                data : data,
                mapData: mapData,
                joinBy: ['iso-a3', 'code3'],
                name: 'Current population',
                allowPointSelect: true,
                cursor: 'pointer',
                states: {
                    select: {
                        color: '#a4edba',
                        borderColor: 'black',
                        dashStyle: 'shortdot'
                    }
                }
            }]
        }).highcharts();

        // Pre-select a country
        mapChart.get('us').select();
    });
});



	var isLoggedIn = false;
	$(function () {
	    $('.modal').attr('style','height:' + window.innerHeight + 'px !important;'); 
	    var buildCriteriaWidget = function () {
	        var cw = $('.criteria-widget table');
	        cw.find('td.product').text(decodeURIComponent(parms.product));
	        cw.find('td.origin').text(decodeURIComponent(parms.origin));
	        cw.find('td.market').text(decodeURIComponent(parms.market).split('#')[0]);
	    }
	    window.setTimeout(buildCriteriaWidget, 1000);
	});
	var showLogin = function (href) {
	    //setCookie('SM2PLPage', escape(href), 1);
	    $('#LoginFrame').html('<iframe id="Authentication_iframe_login" width="188" scrolling="no" height="200" frameborder="0" src="http://search.standardsmap.org:8080/ShowLogin.aspx?reqUrl='&#32;+&#32;encodeURIComponent(href)&#32;+&#32;'"></iframe>');
	    //$('#Authentication_iframe_login').attr('href', './ShowLogin.aspx?reqUrl=' + encodeURIComponent(href));   
	    $('html, body').animate({scrollTop:0}, 'slow');
	    $('#loginModal').modal();
	}
	function setCookie(c_name, value, exdays) {
	    var exdate = new Date();
	    exdate.setDate(exdate.getDate() + exdays);
	    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	    document.cookie = c_name + "=" + c_value;
	}

	var _gaq = _gaq || [];
	var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
	_gaq.push(['_require', 'inpage_linkid', pluginUrl]);
	_gaq.push(['_setAccount', 'UA-31623258-1']);
	_gaq.push(['_setDomainName', 'standardsmap.org']);
	_gaq.push(['_trackPageview']);
	
	(function () {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
	


