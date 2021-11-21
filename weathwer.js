console.log("hello");

const time =document.getElementById('time');
const date = document.getElementById('date');
const currentWeatherItem =document.getElementById('current-weather-items');
const timeZone =document.getElementById('time-zone');
const country = document.getElementById('country');
const weatherForcast =document.getElementById('weather-forcast');
const current =document .getElementById('current-temp');


// console.log(time,date,currentWeatherItem,timeZone,country,weatherForcast,current);
const apiKey = `f4a3510f9e426c036fac5da2daa090a7`;
// console.log(apiKey)
const months = ['Jan', 'Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
const days =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
setInterval(()=>{
const t = new Date();
const month = t.getMonth();
const day  = t.getDay();
const dte = t.getDate();
const hour = t.getHours();
const hoursIn12HFormat = hour >=13 ? hour%12 : hour
const minutes = t.getMinutes();
const min = minutes<10 ? '0'+minutes : minutes;
const ampm = hour >= 12 ? 'PM' : 'AM';

time.innerHTML = hoursIn12HFormat + ':' + min+ ' '+`<span id="am-pm">${ampm}</span>`;
date.innerHTML = days[day] + ', '  + dte+ ' ' + months[month];

}, 1000)