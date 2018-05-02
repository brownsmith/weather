Forecast = {};

Forecast.objects = {};

Forecast.base = new (function() {


	this.init = function() {


		// https://xboxapi.com/profile/LucasHalfred
		// http://weather.yahooapis.com/forecastjson?w=12797154
		// http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/capabilities?res=3hourly&key=ff250955-7c8b-449b-b71a-93e108ff118a
		// http://api.worldweatheronline.com/free/v1/weather.ashx?q=London&format=json&num_of_days=5&key=zvnebhrcsd8vyzzepktm3ckh


		Forecast.ajax({
			url: 'http://api.worldweatheronline.com/free/v1/weather.ashx?q=London&format=json&num_of_days=5&key=zvnebhrcsd8vyzzepktm3ckh',
			onSuccess:function(result){
				console.log('SUCCESS');
			},
			format:'jsonp',
			method:'POST'
		});

	}

});

Forecast.ajax = function(options){

	var _config = {
		url: options.url, 			//URL to be loaded
		onSuccess: function(results) {
			console.log('results',results);
		},	//Function that should be called at success
		onError: false,		//Function that should be called at error
		format:'json',		//Return type - could be 'xml','json' or 'text'
		method:'GET'		//GET or POST
	}

	//console.log(_config.url);
	
	//Create a xmlHttpRequest object 
	var _getHTTPObject = function(){
		var http = false;
		//Use IE's ActiveX items to load the file.
		if(typeof ActiveXObject != 'undefined') {
			try {http = new ActiveXObject("Msxml2.XMLHTTP");}
			catch (e) {
				try {http = new ActiveXObject("Microsoft.XMLHTTP");}
				catch (E) {http = false;}
			}
		//If ActiveX is not available, use the XMLHttpRequest of Firefox/Mozilla etc. to load the document.
		} else if (window.XMLHttpRequest) {
			try {http = new XMLHttpRequest();}
			catch (e) {http = false;}
		}
		return http;
	}

	// This function is called from the user's script. 
	//Arguments - 
	//	url	- The url of the serverside script that is to be called. Append all the arguments to 
	//			this url - eg. 'get_data.php?id=5&car=benz'
	//	callback - Function that must be called once the data is ready.
	//	format - The return type for this function. Could be 'xml','json' or 'text'. If it is json, 
	//			the string will be 'eval'ed before returning it. Default:'text'
	//	method - GET or POST. Default 'GET'
	var _load = function(url,callback,format,method, opt) {
		var http = _getHTTPObject(); //The XMLHttpRequest object is recreated at every call - to defeat Cache problem in IE
		if(!http||!url) return;
		//XML Format need this for some Mozilla Browsers
		if (http.overrideMimeType) http.overrideMimeType('text/xml');

		if(!opt) opt = {};
		format = format.toLowerCase();
		method = method.toUpperCase();
		
		//Kill the Cache problem in IE.
		var now = "uid=" + new Date().getTime();
		url += (url.indexOf("?")+1) ? "&" : "?";
		url += now;

		var parameters = null;

		if(method=="POST") {
			var parts = url.split("\?");
			url = parts[0];
			parameters = parts[1];
		}
		http.open(method, url, true);

		if(method=="POST") {
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}

		var ths = this;// Closure
		if(opt.handler) { //If a custom handler is defined, use it
			http.onreadystatechange = function() { opt.handler(http); };
		} else {
			http.onreadystatechange = function () {//Call a function when the state changes.
				if (http.readyState == 4) {//Ready State will be 4 when the document is loaded.
					if(http.status == 200) {
						var result = "";
						if(http.responseText) result = http.responseText;

						//If the return is in JSON format, eval the result before returning it.
						if(format.charAt(0) == "j") {
							//\n's in JSON string, when evaluated will create errors in IE
							result = result.replace(/[\n\r]/g,"");
							
							//Try/Catch because there was an error if the format was not JSON
							try {
								result = eval('('+result+')');
							}
							catch (e) {
								// statements to handle any exceptions
							   console.log(e);							   
							}
						} else if(format.charAt(0) == "x") { //XML Return
							result = http.responseXML;
						}

						//Give the data to the callback function.
						if(callback) callback(result);
					} else {
						//if(error) error(http.status);
					}
				}
			}
		}
		http.send(parameters);
	}

	// Make the call
	_load(_config.url,_config.onSuccess,_config.format,_config.method,_config.opt);
}




forecast = new Forecast.base.init();
