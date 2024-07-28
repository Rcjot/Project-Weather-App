function importAll(r) {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const imgs = importAll(require.context('./assetsSVG', false, /\.(png|jpe?g|svg)$/));
  
export const setIconModule = (function(){
    function setIcon(img, icon) {
        img.src = imgs[`${icon}.svg`];
    }

    return {
        setIcon,
    }
})();