function wrap_show_less(css, value){
    return " <div class=\"text-container\"> \
<div class=\"text-content "+css+"\">  "+value+" </div> \
<div class=\"show-more \"> \
  <div class='rounded-box'> <a style='margin:10px;' href=\"#\">show more</a></div> \
 </div></div> ";
}

function getShowLinkText(currentText) {
        var newText = '';

        if (currentText.toUpperCase() === "SHOW MORE") {
            newText = "show less";
        } else {
            newText = "show more";
        }

        return newText;
    }

function evaluate_show_less(toggle_classes){
    $(".show-more .rounded-box a").each(function() {
        var $link = $(this);
        var $content = $link.parent().parent().prev("div.text-content");

        var $title = $link.parent().parent().parent().parent().find("h2.middle-column-title").first();
       $link.parent().parent().parent().parent().parent().parent().find("div.first-colum-first-row").first().css('padding-top', ($title[0].clientHeight-12)+"px");

       $link.parent().parent().parent().parent().parent().parent().find("div.left-first-colum-first-row").first().css('padding-top', ($title[0].clientHeight-5)+"px");
  //      console.log("cH", $title[0].clientHeight-12); //
    //    console.log($link);
    //    console.log($content.first().position());

        var visibleHeight = $content[0].clientHeight;
        var actualHide = $content[0].scrollHeight - 1;

       // console.log("aH",actualHide,"vH", visibleHeight);

        if (actualHide > visibleHeight) {
            $content.first().addClass("short-text");
            $link.show();

        } else {
            $link.hide();
        }
    });
$(".show-more .rounded-box a").unbind("click");
    $(".show-more .rounded-box a").on("click", function() {
        var $link = $(this);
        var $content = $link.parent().parent().prev("div.text-content");
        var linkText = $link.text();
        console.log("here", toggle_classes);
        $content.toggleClass(toggle_classes);

        $link.text(getShowLinkText(linkText));

        return false;
    });

}
