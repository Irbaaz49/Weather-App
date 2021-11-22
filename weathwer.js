console.log("hello");

const time = document.getElementById('time');
const date = document.getElementById('date');
const currentWeatherItem = document.getElementById('current-weather-items');
const timeZone = document.getElementById('time-zone');
const country = document.getElementById('country');
const weatherForcast = document.getElementById('weather-forcast');
const current = document.getElementById('current-temp');


// console.log(time,date,currentWeatherItem,timeZone,country,weatherForcast,current);
const apiKey = `f4a3510f9e426c036fac5da2daa090a7`;
// console.log(apiKey)
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
setInterval(() => {
    const t = new Date();
    const month = t.getMonth();
    const day = t.getDay();
    const dte = t.getDate();
    const hour = t.getHours();
    const hoursIn12HFormat = hour >= 13 ? hour % 12 : hour || hour ? hour : 12
    const minutes = t.getMinutes();
    const min = minutes < 10 ? '0' + minutes : minutes;
    const ampm = hour >= 12 ? 'PM' : 'AM';

    time.innerHTML = hoursIn12HFormat + ':' + min+`<span id="am-pm">${ampm}</span>`;
    date.innerHTML = days[day] + ', ' + dte + ' ' + months[month];

}, 1000);


getWeatherData();
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);


        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`).then(res => res.json()).then(data => {
            console.log(data)

            showWeatherData(data);
        })


    })
}
function showWeatherData(data) {

    let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

    timeZone.innerHTML = data.timezone;
    country.innerHTML = data.lat + 'N ' + data.lon + 'E';

    currentWeatherItem.innerHTML =
        ` <div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}%</div>
</div>
<div class="weather-item">
    <div>Wind Speed</div>
    <div>${wind_speed}</div>
</div>
<div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>
</div>
<div class="weather-item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
</div>
<div class="weather-item">
    <div>Sunset</div>
    <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
</div>` ;
    let otherDayForcast = '';
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            current.innerHTML = ` <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <div class="temp">Day<br> - ${day.temp.day}&#176;C</div>
                <div class="temp">Night <br> - ${day.temp.night}&#176;C</div>
            </div>`
        }
        else {
            otherDayForcast += ` <div class="weather-forcast-item">
<div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
<img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="icon">
<div class="temp">Day <br>&nbsp-<br>${day.temp.day}&#176; C</div>
<br>
<div class="temp">Night<br> -<br>${day.temp.night}&#176;C</div>
</div>`



        }
    })

    weatherForcast.innerHTML = otherDayForcast;



}