import { setIconModule } from "./setIcon";

export const renderModule = (function(){
    function renderLoading(){
        const currentDiv = document.querySelector('#currentDiv');
        currentDiv.innerHTML = '';
        currentDiv.textContent = 'loading..';
    }

    function renderCurrentDiv(current) {
        const currentDiv = document.querySelector('#currentDiv');
        currentDiv.innerHTML = '';
        currentDiv.textContent = `${current.cityAddress} ${current.condition} ${current.time} ${current.temp}`;
        const h1Name = document.createElement('h1');
        const h1Temp = document.createElement('p');
        const pText = document.createElement('p');
        h1Name.textContent = current.cityAddress;
        pText.textContent = current.condition;
        const img = new Image();
        img.classList.add('iconCurrent');
        setIconModule.setIcon(img, current.icon);
        h1Temp.textContent = `${current.temp}`;
        h1Temp.classList.add('temp');
        currentDiv.appendChild(h1Name);
        currentDiv.appendChild(img);
        currentDiv.appendChild(pText);
        currentDiv.append(h1Temp);
    }
    
    function renderHourlyDiv(hourlyArr) {
        const hourlyDivContainer = document.querySelector('#hourlyDiv');
        hourlyDivContainer.innerHTML = '';
        for (let hour of hourlyArr) {
            const img = new Image();
            img.classList.add('icon');
            setIconModule.setIcon(img, hour.icon);
            const hourlyDiv = document.createElement('div');
            const h1Time = document.createElement('h1');
            const h1Temp = document.createElement('h1');
            h1Time.textContent = hour.datetime;
            h1Temp.textContent = hour.temp;
            h1Temp.classList.add('temp');
            hourlyDiv.appendChild(h1Time);
            hourlyDiv.appendChild(img);
            hourlyDiv.appendChild(h1Temp);
            hourlyDivContainer.appendChild(hourlyDiv);
        }
    };
    
    function renderDailyDiv(dailyArr){
        const dailyDiv = document.querySelector('#dailyDiv');
        dailyDiv.innerHTML = '';
        for (let i = 0; i < 7; i++){
            const day = dailyArr[i];
            const img = new Image();
            img.classList.add('icon');
            setIconModule.setIcon(img, day.icon);
            const dayDiv = document.createElement('div');
            const h1Time = document.createElement('h1');
            const h1Temp = document.createElement('h1');
            h1Temp.classList.add('temp');
            h1Time.textContent = day.datetime;
            h1Temp.textContent = day.temp;
            dayDiv.appendChild(h1Time);
            dayDiv.appendChild(img);
            dayDiv.appendChild(h1Temp);
            dailyDiv.appendChild(dayDiv);
        }

    }
    
    function renderError() {
        const display = document.querySelector('#display');
        display.textContent = 'no city found';
    }

    return {
        renderLoading,
        renderCurrentDiv,
        renderHourlyDiv,
        renderDailyDiv,
        renderError
    }
})();



