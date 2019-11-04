$(document).ready(function(){
    $('.checkbox').checkbox({
    	displayAsButton: false,
    	buttonStyle: 'btn-link',
        buttonStyleChecked: null,
        checkedClass: 'fa fa-check-square-o',
        uncheckedClass: 'fa fa-square-o',
        defaultState: false,
        defaultEnabled: true,
        constructorCallback: null	    
    });

    $('input[type="radio"]').checkbox({
    	displayAsButton: false,
    	buttonStyle: 'btn-link',
        buttonStyleChecked: null,
        checkedClass: 'fa fa-dot-circle-o',
        uncheckedClass: 'fa fa-circle-o',
        defaultState: false,
        defaultEnabled: true,
        constructorCallback: null	    
    });
    
    // selectize
//    $('select').selectize();
    
    // initialize tooltips    
    $('.tooltip-control').tooltip();
 



	// Initialize bootstrap tour.  
	// The 'Read more' link will trigger the tour to start.

	$('#start-tour').click(function(){
		var tour = new Tour({
		    name: "tour",
		    container: "body",
		    keyboard: true,
		    storage: false,
		    debug: false,
		    backdrop: true,
		    redirect: true,
		    basePath: "",
		    template: "<div class='popover tour'>"+
		        "<div class='arrow'></div>"+
		        "<h3 class='popover-title'></h3>"+
		        "<div class='popover-content'></div>"+
		        "<nav class='popover-navigation'>"+
		        "    <div class='btn-group'>"+
		        "        <button class='btn btn-primary' data-role='prev'><i class='fa fa-chevron-left'></i></button>"+
		        "        <button class='btn btn-primary' data-role='next'><i class='fa fa-chevron-right'></i></button>"+
		        "    </div>"+
		        "    <button class='btn btn-default' data-role='end'>End tour</button>"+
		        "</nav>"+
		    "</div>"
		});	
		
		tour.addSteps([
		    {
		        element: ".module-nav",
		        title: "Modules navigation",
		        content: "You can navigate between the modules lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum " 
		    },
		    {
		        element: ".criteria-widget",
		        title: "Filter standards using several criteria",
		        content: "lorem ipsum Praesent posuere tincidunt odio a porttitor. Morbi a auctor augue, non ornare elit. Nam nec malesuada neque, non fringilla libero. Sed id massa nec elit euismod"
		    },
		    {
		        element: ".selected-standards-widget",
		        placement: 'left',
		        title: "Filter standards using several criteria",
		        content: "Praesent posuere tincidunt odio a porttitor. Morbi a auctor augue, non ornare elit. Nam nec malesuada neque, non fringilla libero. Sed id massa nec elit euismod"
		    },
		    {
		        element: ".language-selector",
		        placement: 'left',
		        title: "Filter standards using several criteria",
		        content: "Content of my popover"
		    },
		    {
		        element: "#basic-filters",
		        title: "Additional filtering options",
		        content: "Content of my popover"
		    },
		    {
		        element: "#more-filters",
		        title: "Additional filtering options",
		        content: "Content of my popover"
		    }
		]);
		
		tour.start();
	});
	
	
	$('.tooltip-trigger').tooltip({
		container: 'body',
		trigger: 'hover'
	});
	$('select.alt-text-input').on("change", function(el){
		console.log("DDD "+el);
		var target = $(this).data("target") || false;
		console.log("DDD "+target + " " + $(this).val());
		if(target != false && $(this).val() == 'other'){
			$(target).show();
			console.log("showing alt text input");
		} else {
			$(target).hide();
		}
	});
	
	
	$('select.alt-text-input option').each(function(el){
	
	});
});

