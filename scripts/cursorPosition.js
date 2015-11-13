function getCursorPos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: Math.round((event.clientX-rect.left)/(rect.right-rect.left)*canvas.width),
		y: Math.round((event.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height)
	};
}
