import './style.css';
import { renderModule } from './render';
import { renderTemperature } from './temperature';
import { setBandori } from './setBandori';

async function fetchWeather(cityName) {
    try {
        renderModule.renderLoading();
        let cityAPI = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=9UV2RY33EZU7UCZT2LJCVCESJ&contentType=json`);
        let city = await cityAPI.json();
        const currentWeather = {
            cityAddress: city.resolvedAddress,
            condition: city.days[0].conditions,
            icon: city.currentConditions.icon,
            time: city.currentConditions.datetime,
            temp: city.currentConditions.temp
    
        }
        const hourlyWeatherArr = city.days[0].hours;
        const dailyWeatherArr = city.days;
        console.log(city);
        renderModule.renderCurrentDiv(currentWeather);
        renderModule.renderHourlyDiv(hourlyWeatherArr);
        renderModule.renderDailyDiv(dailyWeatherArr);
        renderTemperature.renderUnit();
    } catch {
        renderModule.renderError();
    }

}

(function() {
    const searchBar = document.querySelector('#searchBar');
    const searchBtn = document.querySelector('#searchBtn');

    searchBtn.addEventListener('click',(event) => {
        if (searchBar.value === ''){
            event.preventDefault();
        }else{
            fetchWeather(searchBar.value);
        }
    });

    // searchBtn.click();
})();

setBandori.appendImage();

const tempBtn = document.querySelector('#cb1-6');
tempBtn.addEventListener('change', () => {
    renderTemperature.renderConvert();
})
