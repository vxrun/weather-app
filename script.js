let loc = document.getElementById("location");
let tempIcon = document.getElementById("temp-icon");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconFile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

//Fetching weather by searching location
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';
});

const getWeather = async(city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=136e199370c9fd727171ea0686582ae1`, { mode: 'cors' });
        const weatherData = await respone.json();
        console.log(weatherData);
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempValue.textContent = Math.round(feels_like - 273);
        if (id < 300 && id > 200) {
            tempIcon.src = "./icons/thunderstorm.svg";
        } else if (id < 400 && id > 300) {
            tempIcon.src = "./icons/rainy.svg"
        } else if (id < 500 && id > 400) {
            tempIcon.src = "./icons/rainy-4.svg"
        } else if (id < 600 && id > 500) {
            tempIcon.src = "./icons/rainy-7.svg"
        } else if (id < 700 && id > 600) {
            tempIcon.src = "./icons/day.svg"
        }
    } catch (err) {
        alert('City not found! ');
    }
}



//Fetching weather for current location
window.addEventListener("load", () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "http://cors-anywhere.herokuapp.com/";

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=136e199370c9fd727171ea0686582ae1`
            fetch(api).then((response) => {
                    return response.json();
                })
                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    console.log(data);
                    loc.textContent = name;
                    climate.textContent = main;
                    tempValue.textContent = Math.round(feels_like - 273);
                    if (id < 300 && id > 200) {
                        tempIcon.src = "./icons/thunderstorm.svg";
                    } else if (id < 400 && id > 300) {
                        tempIcon.src = "./icons/rainy.svg"
                    } else if (id < 500 && id > 400) {
                        tempIcon.src = "./icons/rainy-4.svg"
                    } else if (id < 600 && id > 500) {
                        tempIcon.src = "./icons/rainy-7.svg"
                    } else if (id < 700 && id > 600) {
                        tempIcon.src = "./icons/day.svg"
                    }
                })
        }))
    }
})