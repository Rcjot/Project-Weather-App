export const renderTemperature = (function(){
    let onCelsius = true;

    function renderUnit() {
        const tempTextArr = document.querySelectorAll('.temp');

        for (let text of tempTextArr) {
            const unit = (onCelsius) ? ' °C' : ' °F';
            const Temp = parseFloat(text.textContent);
            const textTemperature = Temp + unit;
            text.textContent = textTemperature; 
        }
    }

    function renderConvert() {
        const tempTextArr = document.querySelectorAll('.temp');

        for (let text of tempTextArr) {
            const toUnit = (onCelsius) ? ' °F' : ' °C';
            const Temp = parseFloat(text.textContent);
            const convertedTemp =  (onCelsius) ? (Temp * (9/5)) + 32 : (Temp-32) * (5/9);
            const textTemperature = convertedTemp.toFixed(2) + toUnit;
            text.textContent = textTemperature; 
        }
        onCelsius = !onCelsius;
    }

    return {
        renderUnit,
        renderConvert,
    }
})();