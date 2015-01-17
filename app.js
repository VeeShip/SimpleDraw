var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var ctx = $($canvas)[0].getContext("2d");
var lastEvent; 
var mousedown = false;

//PICKING A COLOR
$(".controls").on("click", "li", function() {

	//DESELCT SIBLING ELEMENTS
	$(this).siblings().removeClass("selected");
	//SELECT CLICKED ELEMENT
	$(this).addClass("selected");
	//CACHE CURRENT COLOR HERE
	color = $(this).css("background-color");
});

//TOGGLE COLOR SELECTOR
$("#revealColorSelect").click(function() {
	changeColor();
	$("#colorSelect").toggle();
});

//CHANGING COLOR SWATCH
function changeColor () {
 	var r = $("#red").val();
 	var g = $("#green").val();
 	var b = $("#blue").val();

 	//ADJUST COLOR SWATCH
	$("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
}

//SLIDERS CHANGES COLORS
$("input[type=range]").change(changeColor);

// ADDING NEW COLOR
$("#addNewColor").click(function() {
	var $newColor = $("<li></li>");
	$newColor.css("background-color", $("#newColor").css("background-color"));
	$(".controls ul").append($newColor);
	//SELECT NEW COLOR
	$newColor.click();
});


//DRAW LINES
$canvas.mousedown(function(e) {
	lastEvent = e;
	mousedown = true;
}).mousemove(function(e) {
	
	//DRAG FEATURE
	if (mousedown) {
		ctx.beginPath();
		ctx.moveTo(lastEvent.offsetX, lastEvent.offsetY);
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.strokeStyle = color;
		ctx.stroke();
		lastEvent = e;
	}
}).mouseup (function () {
	mousedown = false;
}).mouseleave(function() {
	$canvas.mouseup();
});

