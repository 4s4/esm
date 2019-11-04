var select_filters=["select_country","select_region", "select_sector", "select_document_type"];
var document_tab={
    checks:[{value:"ldc", text:"LDC"}, {value:"lldc", text:"LLDC"},{value:"sids", text:"SIDS"},{value:"pcc", text:"Post-conflict countries"}],
    one_option_time:[{id:"Year", val:"2002"}],
    two_option_time:[{id:"StrategyDate", vals:"[2006, 2010]"}],
    selects:["last_update", "counterpart"]
};
var theme_tab={checks:[
    {value:"environment",text:"Environment"},
    {value:"gender", text:"Gender"},
    {value:"poverty_reduction", text:"Poverty Reduction"},
    {value:"youth",text:"Youth"},
    {value:"export_strategy", text:"Export Strategy"},
    {value:"trade_focus", text:"Trade Focus"},
    {value:"trade_facilitation", text:"Trade Facilitation"},
    {value:"trade_finance", text:"Trade Finance"},
    {value:"trade_information", text:"Trade Information"},
    {value:"trade_promotion", text:"Trade Promotion"},
    {value:"quality", text:"Quality Management"},
    {value:"tvet", text:"Technical and Vocational Education and Training"},
    {value:"regional", text:"Regional Scope"},
    {value:"regional_integration", text:"Regional Integration"},
    {value:"all_theme", text:"Select all", not_table:true}
]};
var process_tab={checks:[
    {value:"action_plan", text:"Plan of action"},
    {value:"nec",text:"National Export Council"},
    {value:"allocated_resources", text:"Resources allocated"},
    {value:"country_owned", text:"Country Ownership"},
    {value:"itc",text:"International Trade Center"},
    {value:"participatory",text:"Participatory process"},
    {value:"all_process", text:"Select all", not_table:true}]};

function uncheck(id){
    $('#'+id).prop('checked', false);
}

function check(id){
    $('#'+id).prop('checked', true);
}

function uncheck_all(ids){

    ids.map(function(id){
        uncheck(id.value);
    });
}

function check_all(ids){
    console.log(ids);
    ids.map(function(id){
        check(id.value);
    });
}

function is_checked(id){
    return  $('#'+id).prop('checked');
}
function get_selectize_value(id){
    return $("#"+id).selectize()[0].selectize.getValue();
}
function get_slider_value(id){
    return $("#"+id).slider().slider('getValue');
}
var all_checks=[].concat(document_tab.checks).concat(theme_tab.checks).concat(process_tab.checks);
console.log(all_checks.map(function(o){return o.value}));


$('#clear_filters').on("click", function(){
    all_checks.map(function(d){uncheck(d.value);});
    select_filters.concat(document_tab.selects).map(function(s){
        $('#'+s).selectize()[0].selectize.clear();
    });

});

$('#all_theme').on("click", function(){
    console.log("hellpo");
    if(!is_checked("all_theme")){
        uncheck_all(theme_tab.checks);
    }else{
        check_all(theme_tab.checks);
    }

});

$('#all_process').on("click", function(){
    if(!is_checked("all_process")){
        uncheck_all(process_tab.checks);
    }else{
        check_all(process_tab.checks);
    }
});

$('#apply_filters').on("click", function colect_all_values(){

    alert("look at the console to see which values are used in this search");
    console.log("main select menu:");
    select_filters.map(function(s){
        console.log(s, get_selectize_value(s));
    });
    console.log("\n\n Document_tab:");
    console.log(" - checkboxes:");
    document_tab.checks.map(function(d){console.log(d, "is_checked?", is_checked(d.value));});

    console.log("Year", get_slider_value("Year"));
    console.log("StrategyDate", get_slider_value("StrategyDate"));
    console.log("- last_update", get_selectize_value("last_update"));
    console.log("- authority", get_selectize_value("counterpart"));

    console.log("\n\n Theme_tab:");
    console.log(" - checkboxes:");
    theme_tab.checks.map(function(d){console.log(d, "is_checked?", is_checked(d.value));});

    console.log("\n\n Process_tab:");
    console.log(" - checkboxes:");
    process_tab.checks.map(function(d){console.log(d, "is_checked?", is_checked(d.value));});
    init_table(function(){$('#card-table').show();console.log("loading results");    evaluate_show_less("short-text full-text");
    });
});

var all_checks_map=all_checks.map(function(i){if(!i.not_table){return {text:i.text, value:i.value+"-"+i.text};}else{return false;}}).filter(function(i){return i;});

// console.log(all_checks_map.map(function(i){return i.value.split("-")[0];}));

var show_columns_options= {
    plugins: ['remove_button','drag_drop'],
    options: all_checks_map,
    create: false
};
var show_columns=$("#show-columns");
show_columns.selectize(show_columns_options);
