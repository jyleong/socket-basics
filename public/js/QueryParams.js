function getQueryVariable(variable, url) {
	if (!url) url = window.location.href;

	variable = variable.replace(/[\[\]]/g, "\\$&"); // This is just to avoid case sensitiveness for query parameter name
	var regex = new RegExp("[?&]" + variable + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}