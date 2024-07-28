import fog from './assetsBandori/fog.png';
import wind from './assetsBandori/daywind.png';
import nightsnow from './assetsBandori/nightsnow1.png';

function importAll(r) {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const dayclearImgs = importAll(require.context('./assetsBandori', false,/.*dayclear.*\.(png|jpe?g|svg)$/));
const daycloudyImgs = importAll(require.context('./assetsBandori', false, /.*daycloudy.*\.(png|jpe?g|svg)$/));
const dayrainImgs = importAll(require.context('./assetsBandori', false, /.*dayrain.*\.(png|jpe?g|svg)$/));
const daysnowImgs = importAll(require.context('./assetsBandori', false, /.*daysnow.*\.(png|jpe?g|svg)$/));
const nightImgs = importAll(require.context('./assetsBandori', false, /.*night(clear|cloudy).*\.(png|jpe?g|svg)$/));
// const nightclearImgs = importAll(require.context('./assetsBandori', false, /.*nightclear.*\.(png|jpe?g|svg)$/));
// const nightcloudyImgs = importAll(require.context('./assetsBandori', false, /.*nightcloudy.*\.(png|jpe?g|svg)$/));
const nightrainImgs = importAll(require.context('./assetsBandori', false, /.*nightrain.*\.(png|jpe?g|svg)$/));

export const setBandori = (function(){
    function getRandomImage(icon) {
        let imgArr;

        if (icon.includes('clear')) {
            imgArr = (icon.includes('day')) ? dayclearImgs : nightImgs;
        }else if (icon.includes('cloudy')){
            imgArr = (icon.includes('day')) ? daycloudyImgs : nightImgs;
        }else if (icon.includes('rain') || icon.includes('showers')){
            imgArr = (icon.includes('day')) ? dayrainImgs : nightrainImgs;
        }else if (icon.includes('snow') || icon.includes('sleet')) {
            if (icon.includes('night')) {
                return nightsnow;
            }else {
                imgArr = daysnowImgs;
            }
        }else if (icon.includes('wind')) {
            imgArr = wind;
            return imgArr;
        }else if (icon.includes('fog')) {
            imgArr = fog;
            return fog;
        }else if (icon.includes('thunder')){
            imgArr = nightrainImgs;
        }
        console.log(imgArr);

        const keys = Object.keys(imgArr);
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomKey = keys[randomIndex];
        return imgArr[randomKey];
    }
    
    function appendImage(icon) {
        console.log(icon);
        const bandoriDiv = document.querySelector('#bandoriImgDiv');
        bandoriDiv.innerHTML = '';
        const bandoriImage = new Image();
        bandoriImage.id = 'bandoriImage';
        const randomImage = getRandomImage(icon);
        bandoriImage.src = randomImage;
        bandoriDiv.append(bandoriImage);
    }
    

    return {
        appendImage,
    }
})();