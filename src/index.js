import './style.css';
import { renderModule } from './render';
import { renderTemperature } from './temperature';
import { setBandori } from './setBandori';

async function fetchWeather(cityName) {
    try {
        renderModule.renderLoading();
        let cityAPI = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=9UV2RY33EZU7UCZT2LJCVCESJ&contentType=json`, {mode: 'cors'});
        let city = await cityAPI.json();
        renderModule.stopLoading();
        const currentWeather = {
            cityAddress: city.resolvedAddress,
            condition: city.days[0].conditions,
            icon: city.currentConditions.icon,
            date: city.days[0].datetime,
            temp: city.currentConditions.temp,
            offset: city.tzoffset,
    
        }
        const hourlyWeatherArr = city.days[0].hours;
        const dailyWeatherArr = city.days;
        renderModule.renderCurrentDiv(currentWeather);
        renderModule.renderHourlyDiv(hourlyWeatherArr);
        renderModule.renderDailyDiv(dailyWeatherArr);
        renderTemperature.renderUnit();
    } catch(e) {
        renderModule.renderError();
    }

}

(function() {
    const searchBar = document.querySelector('#searchBar');
    const searchBtn = document.querySelector('#searchBtn');

    searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    })

    searchBtn.addEventListener('click',(event) => {
        if (searchBar.value === ''){
            event.preventDefault();
        }else{
            fetchWeather(searchBar.value);
        }
    });

    searchBtn.click();
})();


const tempBtn = document.querySelector('#cb1-6');
tempBtn.addEventListener('change', () => {
    renderTemperature.renderConvert();
})
