var APIKey = "9f067d1887d1d67972264e590d4c3197";

var city ;
var url = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
var cityArr = [];

window.onload = function() {
    cityArr=JSON.parse(localStorage.getItem("cities"));
    if (cityArr != null) {
        cityArr.forEach(function(x,i) {
            $("#history").prepend($(`<button class="btn b-default citybtn" type="button">${x}</button`));
        })
    }else{
        cityArr=[];
    }
        }
function checkItem(citytxt){
    for (i = 0; i < cityArr.length; i++) {
        if (cityArr[i].toLowerCase() === citytxt.toLowerCase()) {
            return true;
        }
    }
    return false;

}

$("#searchbtn").on("click", function(event) {
    event.preventDefault();
    var inputV=$("#inputV");
    city = inputV.val().trim();

    var check = document.querySelector(".message");
    if (city === "" || city === null) {
        check.innerHTML = "please enter valid selection.";
    }else{
        check.innerHTML = "" ;
        if (cityArr.length >0 && checkItem(city) == false) {
            cityArr.push(city);
            $("#history").preprend($(`<button class="btn-default citybtn" type="button">${city}</button>`));
        }
        else if(cityArr.length == 0) {
            cityArr.push(city); 
            $("#history").preprend($(`<button class="btn-default citybtn" type="button">${city}</button>`));
        }
         localStorage.setItem("cities",JSON.stringify(cityArr));
         localStorage.getItem("citites");
    }
    currentData();
    });

function currentData() {
    let geoURL = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}';
    let lat,lon;
    $.ajax({
        url: geoURL,
        dataType: 'json',
        type: 'GET',
        data: {
            q: city,
            appid: APIKey,
            limit: 1
        },

        success: function(data) {
            lat = data[0].lat;
            lon = data[0].lon;
        }
    })
    $.ajax({
        url: url,
        datType:"json",
        type: "GET",
        data: {
            q: city,
            appid: apiKey,
            units:"metric",
            lat: lat,
            lon: lon,
        },
        success:function(data){
            $("#city").txt(data.name + "" + moment(). format('YYYY-MM-DD'));
            $("#temp").txt("Temperature : " + data.main.temp + "add degree");
            $("#humidity").txt("Humididty : " + data.main.humidity + "%");
            $("#wind").txt("Wind : " + data.wind.speed + "mph");
            $("#icon").attr('src', "add url" + data.weather[0].icon + ".png");
            
            let dayNum=1;
            for (let i = 0; i < 5; i++) {
                let dayEl = document.querySelector("#day-" + dayNum);

                if (document.querySelector("#day-" + dayNum)){
                    dayEl.innerHTML="";
                }else{
                    break;
                }
                dayNum = dayNum+1;
                }
                fivedayData(data.name,data.lat,data.lon);
            }
    })
}

function fivedayData(city,lat,lon) {
    const fivedayURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
    let index = 3;
    let dayNum = 1;
    $.ajax({
        url: fivedayURL,
        dataType:"json",
        method: "GET",
        data: {
            q: city,
            appid: apiKey,
            units: "metric",
            lat: lat,
            lon: lon,
        },
        success: function(response){
            for (let i = 4; i < response.list.length; i += 8) {
                const iconResponse = response.list[i].weather[0].icon;
                const shortDate = response.list[i].dt_txt.substr(0, response.list[i].dt_tx.indexOf(''));
                let day = $("<h5>");
                day.txt(shortDate);
                let temp = $("<h6>");
                temp.addClass("card-subtitle mb-2");
                temp.txt("Temperature: " + response.list[i].main.temp + "add degree");
                let wind = $("<h6>");
                wind.txt("Wind: "+response.list[i].wind.speed + "mph");
                let humidity= $("<h6>");
                humidity.txt("Humidity: "+response.list[i].main.humidity + "%");
                let icon= $("<img>");
                icon.attr('src', "add url" + iconResponse + ".png");
                let newLine = $("<br");
                index =index + 8;
                day.append(newLine);
                day.append(icon);
                day.append(temp);
                day.append(wind);
                day.append(humidity);
                $("day-"+dayNum).append(day);
                dayNum=dayNum+1;

            
            }
        }
    })
}

$(document).on("click", ".citybtn", function () {

    city = $(this).txt();
    currentData();
});





    

