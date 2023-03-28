
var apiKey = 'b2fe5c6aeb86bd22e1997756c9b87a40';
var city;
// var queryLatLon = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1' + '&appid=' + apiKey;
// var queryWeather = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lattitude + '&lon=' + longitude + '&appid=' + apiKey;
var title = document.querySelector('.title');
var cityName = document.querySelector('#city-name');
var searchBtn = document.querySelector('#button-get');
var text = document.querySelector('#floatingInput');
var cityName = document.querySelector('#city-name');
var search = document.querySelector('#seacrh');

function getWeather() {
   fetch ('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1' + '&appid=' + apiKey)
        .then (function (response) {
            return response.json();
    })
    .then (function (data) {
        console.log(data);
        fetch ('https://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=' + apiKey)
                .then (function (response2) {
                    return response2.json();
                })
                .then (function (data2) {
                    console.log(data2);
                    for (let i = 0; i < 1; i++) {
                        var mainEl = document.createElement('h2')
                        var weatherEl = document.createElement('h3')
                        var cloudsEl = document.createElement('h4')
                        mainEl.textContent = 'Temperature: ' + (Math.floor((data2.list[i].main.temp) - 273.15) * (9/5) + 32) + ' F';
                        weatherEl.textContent = 'Icon: ' + data2.list[i].weather[i].icon;
                        cloudsEl.textContent = 'Clouds: ' + data2.list[i].weather[i].description;
                        cityName.appendChild(mainEl);
                        cityName.appendChild(weatherEl);
                        cityName.appendChild(cloudsEl);
                    }
            }) 
    }
)}
// getWeather();  


searchBtn.addEventListener('click', function() {
    city = text.value
    getWeather();
    cityName.textContent = city;
    var historyBtn = document.createElement('button');
    historyBtn.setAttribute('margin', '20px');
    historyBtn.textContent = city;
    searchBtn.appendChild(historyBtn);
})


