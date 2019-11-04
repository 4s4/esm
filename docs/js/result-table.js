$.extend($.fn.bootstrapTable.defaults, {classes:'table'});

function titleFormatter(value){
    return "<a href=\"search_details.html#\">"+value+"</a>";

}
function sectorsFormatter(value){
    var screen_bigger=$( window ).width()>760;
    var chunk=3;
    var css_class="col-sm-4";
    if(screen_bigger){
        chunk=6;
        css_class="col-sm-2";

    }

//    alert(more_bigger);
    function row(row_data){return "<div class='row' style='margin-left: -38px;margin-bottom: 10px;'>"+row_data+"</div>";}
    function extractRowData(value){

        return value.map(function(s){return "<div class='"+css_class+"'><div class=\"label label-default label-table "+css_class+"\"><div class=\" \">"+s+"</div></div></div>";}).join(" ");
    }
    function r(i){
        return row("<ul id=\"grid\">" +extractRowData(i)+"</ul> ");
    }


    var i,j,temparray=[];
    for (i=0,j=value.length; i<j; i+=chunk) {
        temparray.push(value.slice(i,i+chunk));
        // do whatever
    }

    return "<div class=\"container-fluid\">"+temparray.map(r).join("")+" </div>";
}
function regionFormatter(value) {
    return value;
}
function countryFormatter(value) {
    return value;
}
function countryCodeFormatter(value) {
    return "("+value+")";
}

function typeFormatter(value){
    return "<span class=\"label label-default label-type\" >"+value+"</span>";
}

function country(c, cc){
    if(c.length>7){
    return "<div  style='margin-top:8px;border-bottom:0px;margin-bottom:-17px;' class='left-first-colum-first-row'><span class='left-table-row-title'>Country:</span> \
<div style='float:right' class='hidden-div-country'> \
<span  class='table-value boldi' >&nbsp;</span> \
<span style='color:black;' class='table-value boldi'>&nbsp;</span> \
</div> \
</div> \
<div  style='margin-top:8px;' class='left-first-colum-first-row'><span class='left-table-row-title'>&nbsp;</span><div class='div-country'> \
<span  class='table-value boldi'> "+c+"</span> \
<span style='color:black;' class='table-value boldi'>"+cc+"</span> \
</div></div>";
    }else{
        return "<div  style='margin-top:8px;' class='left-first-colum-first-row'><span class='left-table-row-title'>Country:</span><div class='div-country'> \
<span  class='table-value boldi'> "+c+"</span> \
<span style='color:black;' class='table-value boldi'>"+cc+"</span> \
</div></div> ";
    }
    }

function leftFormatter(value) {
    var t=regionFormatter(value.region);
    var c=countryFormatter(value.country);
    var cc=countryCodeFormatter(value.countryCode);
    return "<div class='left-first-colum-first-row' > \
<span class='left-table-row-title'>Region:</span><div class='span-region table-value boldi' >"+t+"</div></div> \
"+country(c, cc)+" \
<div style='margin-top:18px;padding:10px;border:1px solid rgb(187, 187, 187);text-align: center;'> \
<img class='world' src='/img/maps/"+value.region+".png' ></div>";
}

function middleFormatter(value) {
    return "<div class='middle-column'><h2 class='middle-column-title'>"+titleFormatter(value.title)+"</h2> \
"+wrap_show_less("eval-text", value.description)+" \
<h3 class='middle-column-sectors' >Sectors:</h3> "+wrap_show_less("eval-sectors", sectorsFormatter(value.sectors));
}

function rightFormatter(value) {
    var t=typeFormatter(value.type);
    var year=+value.year;
    var iP= value.implementationPeriod;
    return "<div class='first-colum-first-row first-colum-first-row-bis' ><span class='table-row-title ' >Type: </span><span style='float:right' class='table-value ' >"+t+"</span><hr class='hr-table-column'></div> \
<div   class='left-first-colum-first-row'><span class='left-table-row-title'>Year:</span><div class='div-year'> \
<span  class='table-value boldi'> "+year+"</span> \
</div></div> \
<div   class='left-first-colum-first-row'><span class='left-table-row-title'>Period:</span><div class='div-ip' > \
<span  class='table-value boldi'> "+iP+"</span> \
</div></div> \
<div class='last-update-div'> <span class='last-update'>last update: </span><span class='last-update-value'>"+value.lastUpdate+"</span></div></div>"


}

function yearFormatter(value){
    return value;
}

function checkFormatter(check){
    var title="<span class='check-title'>"+all_checks.filter(function(o){return o.value==check.title;})[0].text+"</span><br>";
    if(check.value){
        return title+'<i class="fa fa-check-square-o"></i> ';
    }else{
        return title+'<i class="fa fa-square-o"></i> ';
    }
    }

function queryParams(params) {
//    console.log("receiveing:", params);
    var r ={
        sort: params.sort,
        order:params.order,
        limit: params.limit,
        offset: params.offset
    };
  //  console.log("returning:", r);
    return r;
}

var the_options={
    //"url":"http://localhost:3003/documents",
//    "url":"http://desarrollo.enjava.com:3000/documents",
    "url":"http://itc-esm.appspot.com/documents",
    sidePagination:"server",
    pagination:true,
        method:"get",
        sortName:"region left",
        sortOrder:"asc",
        pageSize:5,
        queryParams:queryParams,
        cache: false,
        striped: false,
        pageList: [5, 10, 20, 30],
        search: false,
        showRefresh: false,
        showColumns: false,
        showHeader:false,
        clickToSelect: false,
        iconsPrefix: 'fa',
        toolbar: '#custom-toolbar',
        toolbarAlign: "right",
        icons: {
	    paginationSwitchDown: 'fa-collapse-down icon-chevron-down',
	    paginationSwitchUp: 'fa-collapse-up icon-chevron-up',
	    refresh: 'fa-refresh icon-refresh',
	    toggle: 'fa-list-alt icon-list-alt',
	    columns: 'fa-th icon-th'
        }
    };

function resultTableOptions(the_columns){
    the_options.columns= the_columns;
    return the_options;}

var column1={
	        field: "left",
	        title: "",
	        valign: "top",
	        align: "left",
	        description: "left header description",
                formatter:"leftFormatter",
                class:"col-md-2 column1"

};

var column2={
	        field: "middle",
	        title: "",
	        valign: "top",
	        align: "left",
	        description: "middle header description",
                formatter:"middleFormatter",
                class:"col-md-7"
};

var column3={
	        field: "right",
	        title: "",
	        valign: "top",
	        align: "left",
	        description: "right header description",
                formatter:"rightFormatter",
                class:"column3 col-md-3 "
	    };

var column_new={
	        field: "new",
	        title: "",
	        sortable: true,
//                sorter:"rightSorter",
	        valign: "top",
	        align: "left",
	        description: "right header description",
//                formatter:"rightFormatter",
                class:"col-md-3"
	    };

var the_columns=[column1, column2, column3];

var $resultTableContainer = $('.results-table');

var $resultTable = $resultTableContainer.find('table');

// $('.fixed-table-toolbar').prepend($('.pagination-detail').html()).addClass('text-muted');


$('#sorter').on('change', function() {
    var r={};
    $.extend(true, r , resultTableOptions(the_columns));
//        r.showHeader=true;
 //       r.showRefresh=false;
//        r.data=data;
//        r.showColumns= true;
    //        alert("value_selected:"+ this.value);


    $('.results-table').find('table').bootstrapTable('destroy');
        r.sortName=this.value;
    $('.results-table').find('table').bootstrapTable(r);
    evaluate_show_less("short-text full-text");
    reload_event();
});

$('#sorter-how').on('change', function() {
    var r={};

    $.extend(true, r , resultTableOptions(the_columns));
//        r.showHeader=true;
 //       r.showRefresh=false;
//        r.data=data;
//        r.showColumns= true;
//            alert("value_selected:"+ this.value);

//    r.data=order_by($('#sorter').val(), is_asc(this.value));
    $('.results-table').find('table').bootstrapTable('destroy');
    r.sortOrder=this.value;
    $('.results-table').find('table').bootstrapTable(r);
    evaluate_show_less("short-text full-text");
    reload_event();
});


var original_width;

$("#show-columns").on('change', function(e) {
    var c=JSON.stringify(show_columns.val());
//    console.log(c);


    var new_columns=show_columns.val().map(function(o){
        var e=o.split("-");
        return {field:e[0], title:e[1], formatter:"checkFormatter", class:"f-column-width"}});
//    console.log(new_columns);


    var r={};

    $.extend(true, r , resultTableOptions(the_columns.concat(new_columns)));
//    r.showHeader=true;

    $('.results-table').find('table').bootstrapTable('destroy');
    $('.results-table').find('table').bootstrapTable(r);


    if(!original_width){
        original_width= $('.fixed-table-body').css('width');}
    var pix=parseInt(original_width.split("px")[0]);

    if(new_columns.length>1){

        var extra=100*new_columns.length;
//        console.log("new width:=>", (pix+extra));
        $('.fixed-table-body').css('width', (pix+extra)+'px');
    }
//    var n=$('.fixed-table-container table')[0].scrollWidth - $('.fixed-table-container table').innerWidth();

   evaluate_show_less("short-text full-text");

    reload_event();


});


function init_table(callback){
//    alert("init table");
//    $('.results-table').find('table').bootstrapTable('destroy');
    $resultTable.bootstrapTable(resultTableOptions( the_columns));
    $('.results-table').on('load-success.bs.table', function (e, name, args) {
        //        console.log('Event:', name, ', data:', args);
        console.log("jijij");
        evaluate_show_less("short-text full-text");
        callback();
    });
    reload_event();
}

function reload_event(){
$('.results-table').on('all.bs.table', function (e, data) {
    evaluate_show_less("short-text full-text");
    console.log("jau");
});
    evaluate_show_less("short-text full-text");
}
