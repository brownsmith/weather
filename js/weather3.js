/*
/ Weather forecast - Paul Brownsmith 2013
/ Data via: worldweatheronline.com
*/

/*

TODO List:

- Next 5 days weather
- store more than one location on the settings screen

*/

Forecast = {};

Forecast.objects = {};

Forecast.base = new (function() {

	var tempType = localStorage.getItem('tempType');

	this._weatherCodes = {
		"codes": {
			"condition": {
				
				"395": {
					"description": "Moderate or heavy snow in area with thunder",
					"day_icon": "wsymbol_0012_heavy_snow_showers",
					"night_icon": "wsymbol_0028_heavy_snow_showers_night"
				},
			
				"392": {
					"description": "Patchy light snow in area with thunder",
					"day_icon": "wsymbol_0016_thundery_showers",
					"night_icon": "wsymbol_0032_thundery_showers_night"
				},

				"389": {
					"description": "Moderate or heavy rain in area with thunder",
					"day_icon": "wsymbol_0024_thunderstorms",
					"night_icon": "wsymbol_0040_thunderstorms_night"
				},
			
				"386": {
					"description": "Patchy light rain in area with thunder",
					"day_icon": "wsymbol_0016_thundery_showers",
					"night_icon": "wsymbol_0032_thundery_showers_night"
				},

				"377": {
					"description": "Moderate or heavy showers of ice pellets",
					"day_icon": "wsymbol_0021_cloudy_with_sleet",
					"night_icon": "wsymbol_0037_cloudy_with_sleet_night"
				},

				"374": {
					"description": "Light showers of ice pellets",
					"day_icon": "wsymbol_0013_sleet_showers",
					"night_icon": "wsymbol_0029_sleet_showers_night"
				},

				"371": {
					"description": "Moderate or heavy snow showers",
					"day_icon": "wsymbol_0012_heavy_snow_showers",
					"night_icon": "wsymbol_0028_heavy_snow_showers_night"
				},

				"368": {
					"description": "Light snow showers",
					"day_icon": "wsymbol_0011_light_snow_showers",
					"night_icon": "wsymbol_0027_light_snow_showers_night"
				},

				"365": {
					"description": "Moderate or heavy sleet showers",
					"day_icon": "wsymbol_0013_sleet_showers",
					"night_icon": "wsymbol_0029_sleet_showers_night"
				},

				"362": {
					"description": "Light sleet showers",
					"day_icon": "wsymbol_0013_sleet_showers",
					"night_icon": "wsymbol_0029_sleet_showers_night"
				},

				"359": {
					"description": "Torrential rain shower",
					"day_icon": "wsymbol_0018_cloudy_with_heavy_rain",
					"night_icon": "wsymbol_0034_cloudy_with_heavy_rain_night"
				},

				"356": {
					"description": "Moderate or heavy rain shower",
					"day_icon": "wsymbol_0010_heavy_rain_showers",
					"night_icon": "wsymbol_0026_heavy_rain_showers_night"
				},

				"353": {
					"description": "Light rain shower",
					"day_icon": "wsymbol_0009_light_rain_showers",
					"night_icon": "wsymbol_0025_light_rain_showers_night"
				},

				"350": {
					"description": "Ice pellets",
					"day_icon": "wsymbol_0021_cloudy_with_sleet",
					"night_icon": "wsymbol_0037_cloudy_with_sleet_night"
				},

				"338": {
					"description": "Heavy snow",
					"day_icon": "wsymbol_0020_cloudy_with_heavy_snow",
					"night_icon": "wsymbol_0036_cloudy_with_heavy_snow_night"
				},

				"335": {
					"description": "Patchy heavy snow",
					"day_icon": "wsymbol_0012_heavy_snow_showers",
					"night_icon": "wsymbol_0028_heavy_snow_showers_night"
				},

				"332": {
					"description": "Moderate snow",
					"day_icon": "wsymbol_0020_cloudy_with_heavy_snow",
					"night_icon": "wsymbol_0036_cloudy_with_heavy_snow_night"
				},

				"329": {
					"description": "Patchy moderate snow",
					"day_icon": "wsymbol_0020_cloudy_with_heavy_snow",
					"night_icon": "wsymbol_0036_cloudy_with_heavy_snow_night"
				},

				"326": {
					"description": "Light snow",
					"day_icon": "wsymbol_0011_light_snow_showers",
					"night_icon": "wsymbol_0027_light_snow_showers_night"
				},

				"323": {
					"description": "Patchy light snow",
					"day_icon": "wsymbol_0011_light_snow_showers",
					"night_icon": "wsymbol_0027_light_snow_showers_night"	
				},

				"320": {
					"description": "Moderate or heavy sleet",
					"day_icon": "wsymbol_0019_cloudy_with_light_snow",
					"night_icon": "wsymbol_0035_cloudy_with_light_snow_night"
				},

				"317": {
					"description": "Light sleet",
					"day_icon": "wsymbol_0021_cloudy_with_sleet",
					"night_icon": "wsymbol_0037_cloudy_with_sleet_night"
				},

				"314": {
					"description": "Moderate or Heavy freezing rain",
					"day_icon": "wsymbol_0021_cloudy_with_sleet",
					"night_icon": "wsymbol_0037_cloudy_with_sleet_night"
				},

				"311": {
					"description": "Light freezing rain",
					"day_icon": "wsymbol_0021_cloudy_with_sleet",
					"night_icon": "wsymbol_0037_cloudy_with_sleet_night"
				},

				"308": {
					"description": "Heavy rain",
					"day_icon": "wsymbol_0018_cloudy_with_heavy_rain",
					"night_icon": "wsymbol_0034_cloudy_with_heavy_rain_night"
				},

				"305": {
					"description": "Heavy rain at times",
					"day_icon": "wsymbol_0010_heavy_rain_showers",
					"night_icon": "wsymbol_0026_heavy_rain_showers_night"
				},

				"302": {
					"description": "Moderate rain",
					"day_icon": "wsymbol_0018_cloudy_with_heavy_rain",
					"night_icon": "wsymbol_0034_cloudy_with_heavy_rain_night"
				},

				"299": {
					"description": "Moderate rain at times",
					"day_icon": "wsymbol_0010_heavy_rain_showers",
					"night_icon": "wsymbol_0026_heavy_rain_showers_night"
				},

				"296": {
					"description": "Light rain",
					"day_icon": "wsymbol_0018_cloudy_with_heavy_rain",
					"night_icon": "wsymbol_0034_cloudy_with_heavy_rain_night"
				},

				"293": {
					"description": "Patchy light rain",
					"day_icon": "wsymbol_0017_cloudy_with_light_rain",
					"night_icon": "wsymbol_0033_cloudy_with_light_rain_night"
				},

				"284": {
					"description": "Heavy freezing drizzle",
					"day_icon": "wsymbol_0021_cloudy_with_sleet",
					"night_icon": "wsymbol_0037_cloudy_with_sleet_night"
				},

				"281": {
					"description": "Freezing drizzle",
					"day_icon": "wsymbol_0021_cloudy_with_sleet",
					"night_icon": "wsymbol_0037_cloudy_with_sleet_night"
				},

				"266": {
					"description": "Light drizzle",
					"day_icon": "wsymbol_0017_cloudy_with_light_rain",
					"night_icon": "wsymbol_0033_cloudy_with_light_rain_night"
				},

				"263": {
					"description": "Patchy light drizzle",
					"day_icon": "wsymbol_0009_light_rain_showers",
					"night_icon": "wsymbol_0025_light_rain_showers_night"
				},

				"260": {
					"description": "Freezing fog",
					"day_icon": "wsymbol_0007_fog",
					"night_icon": "wsymbol_0007_fog"
				},

				"248": {
					"description": "Fog",
					"day_icon": "wsymbol_0007_fog",
					"night_icon": "wsymbol_0007_fog"
				},

				"230": {
					"description": "Blizzard",
					"day_icon": "wsymbol_0020_cloudy_with_heavy_snow",
					"night_icon": "wsymbol_0036_cloudy_with_heavy_snow_night"
				},

				"227": {
					"description": "Blowing snow",
					"day_icon": "wsymbol_0019_cloudy_with_light_snow",
					"night_icon": "wsymbol_0035_cloudy_with_light_snow_night"
				},

				"200": {
					"description": "Thundery outbreaks in nearby",
					"day_icon": "wsymbol_0016_thundery_showers",
					"night_icon": "wsymbol_0032_thundery_showers_night"
				},

				"185": {
					"description": "Patchy freezing drizzle nearby",
					"day_icon": "wsymbol_0021_cloudy_with_sleet",
					"night_icon": "wsymbol_0037_cloudy_with_sleet_night"
				},

				"182": {
					"description": "Patchy sleet nearby",
					"day_icon": "wsymbol_0021_cloudy_with_sleet",
					"night_icon": "wsymbol_0037_cloudy_with_sleet_night"
				},

				"179": {
					"description": "Patchy snow nearby",
					"day_icon": "wsymbol_0013_sleet_showers",
					"night_icon": "wsymbol_0029_sleet_showers_night"
				},

				"176": {
					"description": "Patchy rain nearby",
					"day_icon": "wsymbol_0009_light_rain_showers",
					"night_icon": "wsymbol_0025_light_rain_showers_night"
				},

				"143": {
					"description": "Mist",
					"day_icon": "wsymbol_0006_mist",
					"night_icon": "wsymbol_0006_mist"
				},

				"122": {
					"description": "Overcast",
					"day_icon": "wsymbol_0004_black_low_cloud",
					"night_icon": "wsymbol_0004_black_low_cloud"
				},

				"119": {
					"description": "Cloudy",
					"day_icon": "wsymbol_0003_white_cloud",
					"night_icon": "wsymbol_0004_black_low_cloud"
				},

				"116": {
					"description": "Partly Cloudy",
					"day_icon": "wsymbol_0002_sunny_intervals",
					"night_icon": "wsymbol_0008_clear_sky_night"
				},

				"113": {
					"description": "Clear/Sunny",
					"day_icon": "wsymbol_0001_sunny",
					"night_icon": "wsymbol_0008_clear_sky_night"
				},

			}

		}

	}

	this.myLocation = localStorage.getItem('myLocation');

	this.init = function() {

		if (Forecast.base.myLocation === null) {

			// location is empty, get location from geoLocation
			Forecast.objects.getGeolocation = new Forecast.getGeolocation();

			// if no location - no temp type set. Set one now
			localStorage.setItem('tempType', 'C');

		} 
		if (Forecast.base.myLocation != null) {

			// location has a value, so display the weather for the stored location
			Forecast.objects.getData = new Forecast.getData(Forecast.base.myLocation);

		}

		// settings
		Forecast.objects.settings = new Forecast.settings();

	}

});

Forecast.getData = function(myLocation) {

	var myLocation = myLocation;

	var contentDiv = document.getElementById('displayWeather');

	$(function() {
		$.ajax({
			dataType: "jsonp",
			url: 'http://api.worldweatheronline.com/free/v1/weather.ashx?q=' + myLocation + '&format=json&num_of_days=5&key=zvnebhrcsd8vyzzepktm3ckh',
			beforeSend: function() {

				// store current selected location 			
				localStorage.setItem('myLocation', myLocation);

				// add loading spinner elem
				contentDiv.setAttribute('class', 'loading');

			},
			complete: function(){
			
				// remove loading spinner elem
				contentDiv.setAttribute('class', '');
				
			},
			success: function(weather) {
				
				console.log('weather: ', weather);

				// shove the weather data into local storage:
				localStorage.setItem('weatherData', JSON.stringify(weather));

				// call the display weather object
				Forecast.objects.weatherToday = new Forecast.weatherToday();
				
			},
			error: function(data) {

				// retrieve the data from local storage instead...
				Forecast.objects.weatherToday = new Forecast.weatherToday();
							
			}
			
		});
		
	});
	
}

Forecast.weatherToday = function() {

	// get weather data from localStorage (as a string)
	var weatherData = localStorage.getItem('weatherData');

	// convert string back into JSON object
	var weatherDataObj = eval('(' + weatherData + ')');

	// display the weather in this DIV
	var displayWeatherDiv = document.getElementById('displayWeather');

	// variable for the weather description ie 'Partly Cloudy'
	var weatherNum = Forecast.base._weatherCodes.codes.condition[weatherDataObj.data.current_condition[0].weatherCode].description;

	// if temperature setting is in farenheit
	if (localStorage.getItem('tempType') === 'F') {

		// create var with HTML for F temp
		var temp = '<h1 class=\"temp_f\">' + weatherDataObj.data.current_condition[0].temp_F + '<span class=\"temp_f_small\">&#176;F</span></h1>'

		displayWeatherDiv.innerHTML = 

		temp + '<h2>' + weatherNum + '</h2>'

		// location goes here
		+ '<p>' + weatherDataObj.data.request[0].query + '</p>'

		// list for next five days weather summary
		+ '<ul class=\"next5\">'

		// day 1
		//+ '<li>' + utc + ' ' + weatherDataObj.data.weather[0].tempMaxF + '</li>'

		// day 2
		+ '<li>' + weatherDataObj.data.weather[1].date + ': ' + weatherDataObj.data.weather[1].tempMaxF + '&#176;F</li>'

		// day 3
		+ '<li>' + weatherDataObj.data.weather[2].date + ': ' + weatherDataObj.data.weather[2].tempMaxF + '&#176;F</li>'

		// day 4
		+ '<li>' + weatherDataObj.data.weather[3].date + ': ' + weatherDataObj.data.weather[3].tempMaxF + '&#176;F</li>'

		// day 5
		+ '<li>' + weatherDataObj.data.weather[4].date + ': ' + weatherDataObj.data.weather[4].tempMaxF + '&#176;F</li>'

		// close UL
		+ '</ul>'

		// add time for last weather query at server side
		+ '<p class=\"time\">Last updated: ' + weatherDataObj.data.current_condition[0].observation_time + '</p>';

	}

	// if temperature setting is in celcius
	if (localStorage.getItem('tempType') === 'C') {

		// create var with HTML for C temp
		var temp = '<h1 class=\"temp_c\">' + weatherDataObj.data.current_condition[0].temp_C + '<span class=\"temp_c_small\">&#176;C</span></h1>'

		displayWeatherDiv.innerHTML = 

		temp + '<h2>' + weatherNum + '</h2>'

		// location goes here
		+ '<p>' + weatherDataObj.data.request[0].query + '</p>'

		// list for next five days weather summary
		+ '<ul class=\"next5\">'

		// day 1
		//+ '<li>' + utc + ' ' + weatherDataObj.data.weather[0].tempMaxF + '</li>'

		// day 2
		+ '<li>' + weatherDataObj.data.weather[1].date + ': ' + weatherDataObj.data.weather[1].tempMaxC + '&#176;C</li>'

		// day 3
		+ '<li>' + weatherDataObj.data.weather[2].date + ': ' + weatherDataObj.data.weather[2].tempMaxC + '&#176;C</li>'

		// day 4
		+ '<li>' + weatherDataObj.data.weather[3].date + ': ' + weatherDataObj.data.weather[3].tempMaxC + '&#176;C</li>'

		// day 5
		+ '<li>' + weatherDataObj.data.weather[4].date + ': ' + weatherDataObj.data.weather[4].tempMaxC + '&#176;C</li>'

		// close UL
		+ '</ul>'

		// add time for last weather query at server side
		+ '<p class=\"time\">Last updated: ' + weatherDataObj.data.current_condition[0].observation_time + '</p>';

	}

	

	var utc = new Date(weatherDataObj.data.weather[1].date).toUTCString();

	// create HTML for weather forecast
	

}

// get the users current location
Forecast.getGeolocation = function() {

	// if geolocation successful
	success = function(position) {
		alert('test');
		// latitude variable
		var latitude  = position.coords.latitude;

		// longitude variable
		var longitude = position.coords.longitude;

		// new google maps geocoder object
		var geocoder = new google.maps.Geocoder();

		// get co-ordinates from google maps
		var latlng = new google.maps.LatLng(latitude, longitude);

		alert(latlng);

		// pass co-ordinates to google maps API to get current location name
		geocoder.geocode({'latLng': latlng}, function(results, status) {

			if (status == google.maps.GeocoderStatus.OK) {

				if (results[1]) {

					//formatted address
					console.log(results[0].formatted_address)

					//find country name
					for (var i=0; i<results[0].address_components.length; i++) {

						for (var b=0;b<results[0].address_components[i].types.length;b++) {

						//there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
						if (results[0].address_components[i].types[b] == "administrative_area_level_1") {

						//this is the object you are looking for
						city = results[0].address_components[i];
						
						break;

					}

				}

			}

			Forecast.objects.getData = new Forecast.getData(city.short_name);

			} else {

				console.log("No results found");

			}

			} else {

				console.log("Geocoder failed due to: " + status);

			}

	    });

	};

	// if geolocation fails to retrieve your location
	error = function() {

		alert('Unable to retrieve your location');

	};

	// if browser/device supports geoLocation, get current position
	if (navigator.geolocation) {

    	navigator.geolocation.getCurrentPosition(success, error);

    } 

}

Forecast.settings = function() {

	var _config = {

		// settings button
		settingsBtn: document.getElementById('settingsBtn'),

		// done button
		doneBtn: document.getElementById('doneBtn'),

		// settings element
		settingsElem: document.getElementById('settings'),

		// show current location
		currentLocationDiv: document.getElementById('showCurrentLocation'),

		// get weather data from localStorage
		weatherData: localStorage.getItem('weatherData'),

		// convert JSON text into an object
		weatherDataObj: eval('(' + this.weatherData + ')'),

		// settings panel, to flip
		settingsPanel: document.getElementById('panel'),

		// clear location button
		clearLocBtn: document.getElementById('clearLoc'),

		// input field for the location
		locationInput: document.getElementById('newLocation'),

		// location input button
		locationInputBtn: document.getElementById('submitLocation'),

		// back button from the settings page
		backButton: document.getElementById('backBtn'),

		// C
		temp_C_btn: document.getElementById('showTempC'),

		// F
		temp_F_btn: document.getElementById('showTempF')
		

		//saveToFave: document.getElementById('saveFave')

	}

	//_config.saveToFave.addEventListener('click', function() {

	//	localStorage.setItem('locFave', _config.locationInput.value);

	//}, false);

	if (localStorage.getItem('tempType') === 'C') {

		Forecast.addClass(_config.temp_C_btn, 'selected');

	}
	if (localStorage.getItem('tempType') === 'F') {

		Forecast.addClass(_config.temp_F_btn, 'selected');

	}

	_config.temp_C_btn.addEventListener('click', function() {

		// set local storage to temp type
		Forecast.base.tempType = 'C';

		localStorage.setItem('tempType', 'C');

		// remove 'selected' from F
		Forecast.removeClass(_config.temp_F_btn, 'selected');
		
		// add 'selected' to C
		Forecast.addClass(this, 'selected');

	}, false);

	_config.temp_F_btn.addEventListener('click', function() {

		// set local storage to temp type
		Forecast.base.tempType = 'F';

		localStorage.setItem('tempType', 'F');

		// remove 'selected' from C
		Forecast.removeClass(_config.temp_C_btn, 'selected');

		// add 'selected' to F
		Forecast.addClass(this, 'selected');

	}, false);

	// click the clear location button:
	_config.clearLocBtn.addEventListener('click', function(){

		// set the geolocation object off
		Forecast.objects.getGeolocation = new Forecast.getGeolocation();

		// flip the panel
		_config.settingsPanel.className = "panel";

	}, false);

	// click event for the settings button
	_config.settingsBtn.addEventListener('click', function() {

		// add the flip class to panel
		_config.settingsPanel.className = "panel flip";

	}, false);

	_config.locationInputBtn.addEventListener('click', function() {

		// get forecast data from form input value
		Forecast.objects.getData = new Forecast.getData(_config.locationInput.value);

		// flip the panel
		_config.settingsPanel.className = "panel";

		// set the value from the form in the local storage
		localStorage.setItem('myLocation', _config.locationInput.value);

	}, false);

	_config.backButton.addEventListener('click', function() {

		_config.settingsPanel.className = "panel";

		Forecast.weatherToday();


	}, false);

}

// if class is present
Forecast.hasClass = function(ele,cls) {

	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	
}

// add class, pass in element and class value to add
Forecast.addClass = function(ele,cls) {

	if (!Forecast.hasClass(ele,cls)) ele.className += " "+cls;
	
}

// remove class, pass in element and class value to remove
Forecast.removeClass = function(ele,cls) {

	if (Forecast.hasClass(ele,cls)) {
	
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		
		ele.className=ele.className.replace(reg,' ');
		
	}
	
}

forecast = new Forecast.base.init();
