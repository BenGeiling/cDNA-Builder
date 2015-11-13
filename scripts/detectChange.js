//Intialize with detectChange(element) where element = textbox, etc.
//Function calls onChange(element) when a change is detected.

/***********************************************
************************************************
*         Look For Changes To An Element       *
************************************************
************************************************/

function detectChange(element) {
	$(element).each(function() {
		var elem = $(this);

		// Save current value of element
		elem.data('oldVal', elem.val());

		// Look for changes in the value
		elem.bind("propertychange change click keyup input paste", function(event){
			// If value has changed...
			if (elem.data('oldVal') != elem.val()) {
				// Updated stored value
				elem.data('oldVal', elem.val());

				onChange(elem);
			}
		});
	});
}
