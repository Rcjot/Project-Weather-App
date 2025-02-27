import { setIconModule } from "./setIcon";
import { setBandori } from "./setBandori";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

export const renderModule = (function(){

    function clearCurrentDiv() {
        const pTemp = document.querySelector('#currentTemp');
        const pDate = document.querySelector('#currentDate');
        const h1Name = document.querySelector('#currentCityName');
        const pCondition = document.querySelector('#currentCondition');
        const currentTime = document.querySelector('#currentTime'); 
        const iconHolder = document.querySelector('#iconHolder');   
        const hourlyDivContainer = document.querySelector('#hourlyDiv');
        const dailyDiv = document.querySelector('#dailyDiv');
        hourlyDivContainer.innerHTML = '';
        dailyDiv.innerHTML = '';
        pTemp.textContent = '';
        pDate.textContent = '';
        h1Name.textContent = '';
        pCondition.textContent = '';
        currentTime.textContent = '';
        iconHolder.innerHTML = '';

    }   

        
    function renderError() {
        renderLoading(true)
    }

    function renderLoading(bool = false){
        const divs = document.querySelectorAll('#display > div');
        const hr = document.querySelector('hr');
        const bandori = document.querySelector('#bandoriImgDiv');
        hr.style.display = 'none';
        bandori.style.display = 'none';
        for (let div of divs) {
            if (bool) {
                div.classList.remove('loading')
                div.classList.add('error') 
            }else {
                div.classList.remove('error') 
                div.classList.add('loading')
            };
        }
        clearCurrentDiv();
    }

    function stopLoading(){
        const divs = document.querySelectorAll('#display > div');
        const hr = document.querySelector('hr');
        const bandori = document.querySelector('#bandoriImgDiv');
        hr.style.display = 'block';
        bandori.style.display = 'flex';

        for (let div of divs) {
            div.classList.remove('loading');
            div.classList.remove('error');
        } 
    }

    function renderCurrentDiv(current) {

        const formattedDate = format(new Date(current.date), "eee', 'LLLL d y");   
        const pTemp = document.querySelector('#currentTemp');
        const pDate = document.querySelector('#currentDate');
        const h1Name = document.querySelector('#currentCityName');
        const pCondition = document.querySelector('#currentCondition');
        const currentTime = document.querySelector('#currentTime'); 
        const iconHolder = document.querySelector('#iconHolder');       
        const img = new Image();
        img.classList.add('iconCurrent');
        setIconModule.setIcon(img, current.icon);
        pTemp.classList.add('temp');
        const offset = current.offset;
        const metime = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" );
        const formattedTime = format(metime, "HH':'mm");
        pTemp.textContent = current.temp;
        pDate.textContent = formattedDate;
        h1Name.textContent = current.cityAddress;
        pCondition.textContent = current.condition;
        currentTime.textContent = formattedTime;
        iconHolder.appendChild(img);
        setBandori.appendImage(current.icon);
    }

    
    function renderHourlyDiv(hourlyArr) {
        const hourlyDivContainer = document.querySelector('#hourlyDiv');
        hourlyDivContainer.innerHTML = '';
        let scrollPosition;
        let offsetTop;

        for (let hour of hourlyArr) {
            const img = new Image();
            img.classList.add('icon');
            setIconModule.setIcon(img, hour.icon);
            const hourDiv = document.createElement('div');
            const h1Time = document.createElement('p');
            const h1Temp = document.createElement('p');
            const timetempDiv = document.createElement('div');
            const iconHolder = document.createElement('div');
            h1Time.textContent = (hour.datetime).slice(0, -3);
            h1Temp.textContent = hour.temp;
            h1Temp.classList.add('temp');
            hourDiv.appendChild(h1Time);
            timetempDiv.appendChild(h1Temp);
            iconHolder.appendChild(img);
            timetempDiv.appendChild(iconHolder);
            hourDiv.appendChild(timetempDiv);
            hourlyDivContainer.appendChild(hourDiv);

            if (hour.datetime.slice(0,-6) === document.querySelector('#currentTime').textContent.slice(0,-3)){
                hourDiv.classList.add('activeHour');
                offsetTop = hourDiv.offsetTop;
            }
        }
        scrollPosition = offsetTop - (hourlyDivContainer.clientHeight / 1.5);
        hourlyDivContainer.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    };
    
    function renderDailyDiv(dailyArr){
        const dailyDiv = document.querySelector('#dailyDiv');
        dailyDiv.innerHTML = '';
        for (let i = 0; i < 7; i++){
            const day = dailyArr[i];
            const img = new Image();
            img.classList.add('icon');
            setIconModule.setIcon(img, day.icon);
            const formattedDate = (i === 0) ? 'today' : format(new Date(day.datetime), "eee");   
            const formattedTime = format(new Date(day.datetime), "LLLL d")
            const dayDiv = document.createElement('div');
            const pDate = document.createElement('p');
            const pTime = document.createElement('p');
            const pTemp = document.createElement('p');
            const textDiv = document.createElement('div');
            pTemp.classList.add('temp');
            pDate.textContent = formattedDate;
            pTime.textContent = formattedTime;
            pTemp.textContent = day.temp;
            dayDiv.appendChild(textDiv);
            textDiv.appendChild(pDate);
            textDiv.appendChild(pTime);
            dayDiv.appendChild(img);
            dayDiv.appendChild(pTemp);
            dailyDiv.appendChild(dayDiv);
            if (i===0) dayDiv.classList.add('activeHour');

        }

    }


    return {
        renderLoading,
        stopLoading,
        renderCurrentDiv,
        renderHourlyDiv,
        renderDailyDiv,
        renderError
    }
})();



