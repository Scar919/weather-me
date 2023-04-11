const apiKey = "9f067d1887d1d67972264e590d4c3197";

function getWeatherData(lat, lon) {
    const apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&appid=' + apiKey + '&units=imperial';
    
$.ajax({
    url: apiURL,
    method: "GET",
    success: function (response) {
        const currentWeather = response.current;
        const temp = currentWeather.temp;
        const humidity = currentWeather.humidity;
        const windSpeed = currentWeather.wind_speed;
        const icon = currentWeather.weather[0].icon;
        const description = currentWeather.weather[0].description;

        $("#temp").text(`Temperature: ${temp} °F`);
        $("#humidity").text(`Humidity: ${humidity}%`);
        $("#wind").text(`Wind Speed: ${windSpeed} mph`);
        $("#icon").attr("src", `https://openweathermap.org/img/wn/${icon}.png`);
        $("description").text(description);

        const forecastData = response.daily.slice(1, 6);
        for (let i = 0; i < forecastData.length; i++) {
            const date = moment.unix(forecastData[i].dt).format('M/D/YYYY');
            const icon = forecastData[i].weather[0].icon;
            const temp = forecastData[i].temp.day;
            const humidity = forecastData[i].humidity;
            const windSpeed = forecastData[i].wind_speed;

            $(`#day-${i + 1}`).html(`
            <h5>${date}</h5>
            <img src="https://openweathermap.org/img/wn/${icon}.png">
            <p>Temperature: ${temp} °F</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} mph</p>
          `);
        }
    },

    error: function () {
        $(".message").text("Failed to get weather data. Please try again later.");
     }
 });

}

$(document).ready(function () {
    $("#searchbtn").on("click", function () {
        const inputVal = $("#inputV").val().trim();

        if (inputVal) {
            $(".message").text("");

        $.ajax({
        url: `https://api.openweathermap.org/geo/1.0/direct?q=${inputVal}&limit=1&appid=${apiKey}`,
        method: "GET",
        success:function (response) {
            const lat = response[0].lat;
            const lon = response[0].lon;

            $("#city").text(response[0].name);
          getWeatherData(lat, lon);
        },

        error: function () {
          $(".message").text("Failed to get weather data. Please try again later.");
        },
      });
    } else {
      $(".message").text("Please enter a city name")
    }
})
});



    

