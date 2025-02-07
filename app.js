const apikey = "f5c302ec343334dea0f35c6f8ec61a4d";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

//clearing the search bar after refrech
window.onload = function() {
    searchBox.value = "";
};

//searching with the enter key and if they don't enter anything
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (searchBox.value.trim() === "") {
            alert("Please enter a city name.");
            return;
        }
        checkWeather(searchBox.value);
    }
});


async function checkWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    if (!response.ok) {
        alert("City not found! Please enter a valid city.");
        return;
    }

    var data = await response.json();
    
    document.querySelector(".city").innerHTML = data.name ;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) +"°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity +"%";
    document.querySelector(".wind").innerHTML = data.wind.speed +" Km/h";

    if(data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png"
    }else if(data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png"
    }else if(data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png"
    }else if(data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png"
    }else if(data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png"
    }

    document.querySelector(".default-message").style.display = "none";
    document.querySelector(".weather").style.display ="block";
}

searchBtn.addEventListener("click" , ()=> {
    checkWeather(searchBox.value)
})

