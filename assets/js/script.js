var btnGetWeather = $("#btn-get-weather")
var inputCityName = $("#input-city-name")
var APIKey = "89fc85ebc66ba0cecd3656034a43531d"
var histEl =$('#cityHistory');
var searchHistory = []
var cityNames = localStorage.getItem("cityName")
if (cityNames) {
    searchHistory=JSON.parse(cityNames)
    console.log(searchHistory)
    getHistory()
} 
function getWeatherData(latitude, longitude){
  
    var URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}`

    var weatherData = fetch (URL)
    .then (function (response){
        return response.json()
    
    })
    .then (function (data){
        console.log(data.list)
        displayWeather("#current-temp",data.list[0])
        displayWeather("#temp-1",data.list[8])
        displayWeather("#temp-2",data.list[16])
        displayWeather("#temp-3",data.list[24])
        displayWeather("#temp-4",data.list[32])
        displayWeather("#temp-5",data.list[39])
        return data 
    })
    
    // console.log("outside fetch request",weatherData)
}

function displayWeather (weatherID,weatherData){
    console.log(weatherID, weatherData,weatherData.main, weatherData.wind.speed)
    let weatherEL =$(weatherID)
       let displayEL = weatherEL.children(".other")

    let dayEl = displayEL.children(".day")
    dayEl.text(weatherData.dt_txt.split(" ")[0])

    let tempEl = displayEL.children(".temp")
    tempEl.text("Temp: "+weatherData.main.temp)

    let feelsLikeEl = displayEL.children(".feels-like")
    feelsLikeEl.text("Feels Like:  "+weatherData.main.feels_like)

    let humidityEl = displayEL.children(".humidity")
    humidityEl.text("Humidity: "+weatherData.main.humidity)

    let windSpeed = displayEL.children(".wind")
    windSpeed.text("Wind Speed: "+weatherData.wind.speed)
}

// Create buttons based on search history 

function getHistory() {
    histEl.empty();

    for (let i = 0; i <searchHistory.length; i++){

        var rowEl = $('<row>');
        var btnEl = $('<button>').text(`${searchHistory[i]}`)

        rowEl.addClass('row histBtnRow');
        btnEl.addClass('btn btn-outline-secondary histBtn');
        btnEl.attr('type', 'button');

        histEl.prepend(rowEl);
        rowEl.append(btnEl);

    } 
    $('.histBtn').on("click", function (event) {
        event.preventDefault();
        city = $(this).text();
        console.log(city)
        getCityInfo(city)
        // fiveForecastEl.empty();
        // getWeatherData();
    });
}
//Allows the buttons to start a search as well



//Grab the main 'Today' card body.
var cardTodayBody = $('.cardBodyToday')
// function getWeatherData () {
//     var URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`
// }

function getCityInfo(cityName=null){
  
    console.log(cityName)
    var URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`

    var weatherData = fetch (URL)
    .then (function (response){
        return response.json()
    
    })
    .then (function (data){
        let coords = data.city.coord;
        console.log(coords)
        getWeatherData(coords.lat,coords.lon)
        
        // return data 
    })
}
function saveSearch(cityName){
    console.log("save city", cityName)
    searchHistory.push(cityName)
    localStorage.setItem("cityName", JSON.stringify(searchHistory));
    getHistory()
}
btnGetWeather.on("click",(e)=>{
    var cityName = inputCityName.val()
    getCityInfo(cityName)
    saveSearch(cityName);
})

