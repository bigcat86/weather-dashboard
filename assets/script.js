
var apiKey = 'b2fe5c6aeb86bd22e1997756c9b87a40';
// var queryLatLon = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1' + '&appid=' + apiKey;
// var queryWeather = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lattitude + '&lon=' + longitude + '&appid=' + apiKey;
var title = document.querySelector('.title');
var cityName = document.querySelector('#city-name');
var searchBtn = document.querySelector('#button-get');
var text = document.querySelector('#floatingInput');
var cityName = document.querySelector('#city-name');
var search = document.querySelector('#seacrh');
var today = dayjs();

// get each day of the forecast
function getDay() {
    var day = [];
    var cardDate = [];
    for (let i = 0; i < 6; i++) {
        day[i] = today.add(i, 'day');
        cardDate[i] = document.querySelector(`#card-date${i}`);
        cardDate[i].textContent = day[i].format('MM/DD/YY');
    }
}

// ping api for lat/long and weather -- iterate through each day's weather and render to DOM
function getWeather() {
   fetch ('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey)
        .then (function (response) {
            return response.json();
    })
    .then (function (data) {
        fetch ('https://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=' + apiKey)
                .then (function (response2) {
                    return response2.json();
                })
                .then (function (data2) {
                    console.log(data2);
                    var temp = [];
                    var humidity = [];
                    var wind = [];
                    var image = [];
                    var tempEl = [];
                    var humidityEl = [];
                    var windEl = [];
                    var imageEl = [];
                    for (let i = 0; i < 6; i++) {
                        imageEl[i] = document.querySelector(`#image${i}`);
                        tempEl[i] = document.querySelector(`#temp${i}`);
                        humidityEl[i] = document.querySelector(`#humidity${i}`);
                        windEl[i] = document.querySelector(`#wind${i}`);
                        image[i] = data2.list[i * 7].weather[0].icon;
                        temp[i] = Math.floor((data2.list[i * 7].main.temp - 273.15) * (9/5) + 32);
                        humidity[i] = data2.list[i * 7].main.humidity;
                        wind[i] = data2.list[i * 7].wind.speed;
                        imageEl[i].setAttribute('src', 'https://openweathermap.org/img/wn/' + image[i] + '@2x.png');
                        tempEl[i].textContent = 'Temp: ' + temp[i] + ' °F';
                        humidityEl[i].textContent = 'Humidity: ' + humidity[i] + ' %';
                        windEl[i].textContent = 'Wind: ' + wind[i] + ' MPH';
                    }
            }) 
    }
)}


// add functionality foor search and create history buttons / local storage for searched cities
var cityArr = [];
var city;
var historyArr = [];
var historyBtn = [];
var span = document.querySelector('#span');
searchBtn.addEventListener('click', function() {
    city = text.value;
    cityName.textContent = city;
    cityArr.push(city);
    historyBtn = document.createElement('button');
    historyBtn.textContent = city;
    historyArr.push(historyBtn);
    span.appendChild(historyBtn);
    getDay();
    getWeather();
    for (let i = 0; i < cityArr.length; i++) {
        localStorage.setItem(`search-history${i}`, cityArr[i]);
        historyArr[i].addEventListener('click', function() {
            city = cityArr[i];
            cityName.textContent = city;
            getWeather();
        }
    )}   
})

// use "enter" key to search as well
text.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchBtn.click();
    }
})
