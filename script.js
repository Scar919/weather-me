var apiKey = "9f067d1887d1d67972264e590d4c3197";

var city ;
var url = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
var cityArr = [];

$(document).ready(function() {
    cityArr=JSON.parse(localStorage.getItem("cities"));
    if (cityArr != null) {
        cityArr.forEach(function(x,i) {
            $("#history").prepend($(`<button class="btn b-default citybtn" type="button">${x}</button`));
        })
    }else{
        cityArr=[];
    }
        })
function checkItem(citytxt){
    for (i = 0; i<cityArr.length; i++){
        if (cityArr[i].toLowercase() === citytxt.toLowercase()) {
            return true;
        }
    }
    return false;

}

$("searchbtn").on("click", function(event) {
    event.preventDefault();
    var inputV=$("inputV");
    city = inputV.val().trim();

    var check = document.querySelector(".message");
    if (city === "" || city === null) {
        check.innerHTML = "please enter valid selection.";
    }else{
        check.innerHTML = "" ;
        if (cityArr.length >0 && checkItem(city) == false) {
            cityArr.push(city);
            $("#history").preprend($(`button class="btn-default citybtn" type="button">${city}</button>`));
        }
        else if(cityArr.length == 0) {
            cityArr.push(city); 
            $("#history").preprend($(`button class="btn-default citybtn" type="button">${city}</button>`));
        }
         localStorage.setItem("cities",JSON.stringify(cityArr));
         localStorage.getItem("citites");
    }
    currentData();
    });






    

