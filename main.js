const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");
const weatherDataEl = document.getElementById("weather-data");
const apikey = "60f9074cda49e49e5124f351024510d4";

formEl.addEventListener('submit', (event)=>{
    event.preventDefault();
    const cityName = cityInputEl.value;
    getWeatherData(cityName);
})

async function getWeatherData(cityName) {
    try {
        cityInputEl.value = ""
        const response = await fetch(`
        https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric
        `)
        if (!response.ok) {
            let intErr = "It seems you are connected to internet"
            throw new Error ("Something went wrong");
        }
        const data = await response.json();
        console.log(data);

        const country = data.sys.country;
        const city = data.name;
        const icon = data.weather[0].icon;
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const details = [
            `Min temp: ${data.main.temp_min}&deg;C`,
            `Max temp: ${data.main.temp_max}&deg;C`,
            `Humidity: ${data.main.humidity}&percnt;`,
            `Feels like: ${data.main.feels_like}&deg;C`,
            `pressure: ${data.main.pressure}mmgh`,
            `Wind speed: ${data.wind.speed}m/s`,
            `longitude: ${data.coord.lon}`,
            `latitude: ${data.coord.lat}`            
        ]
        
        weatherDataEl.querySelector(".country").innerHTML = country;
        weatherDataEl.querySelector(".city").innerHTML = city;
        weatherDataEl.querySelector(".icon").innerHTML =
         `<img src="http://openweathermap.org/img/wn/${icon}.png"  alt="weather icon that depict the weather condition of the queried area."/>`

         weatherDataEl.querySelector(".temperature").innerHTML = `${temperature}&deg;C`;
         weatherDataEl.querySelector(".description").innerHTML = description;
            
            let x = "";
            for (const detail of details) {
                x += `<div> ${detail} </div>`
            }
            weatherDataEl.querySelector(".details").innerHTML = x;

    } catch (error) {
        weatherDataEl.querySelector(".details").innerHTML = 
        `Something went wrong:
        Check your connection to internet and enter valid name again`
    }   
}