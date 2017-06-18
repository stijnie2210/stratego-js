
function ClickListener() {
}

ClickListener.registerListener = function(elementClass, callback) {
	$('body').off("click", "." + elementClass)
	$('body').on("click", "." + elementClass, callback)
}
