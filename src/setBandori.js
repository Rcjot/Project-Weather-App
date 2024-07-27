import daycloudy from './assetsBandori/daycloudy1.png'

function importAll(r) {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const dayclearImgs = importAll(require.context('./assetsBandori', false,/.*dayclear.*\.(png|jpe?g|svg)$/));
// const dayclearImgs = importAll(require.context('./assetsSVG', false, /\.(png|jpe?g|svg)$/));



export const setBandori = (function(){
    function getRandomImage() {
        const keys = Object.keys(dayclearImgs);
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomKey = keys[randomIndex];
        return dayclearImgs[randomKey];
    }
    
    function appendImage() {
        const bandoriDiv = document.querySelector('#bandoriImgDiv');
        bandoriDiv.innerHTML = '';
        const bandoriImage = new Image();
        bandoriImage.id = 'bandoriImage';
        const randomImage = getRandomImage();
        bandoriImage.src = randomImage;
        bandoriDiv.append(bandoriImage);
    }
    

    return {
        appendImage,
    }
})();