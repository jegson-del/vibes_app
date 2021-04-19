import {Url} from "./url";
import I18n from "./i18n";

export const removeFromArray = (array, index) => {
    array.splice(index, 1);
    return array;
}

export const serverImage = (path) => {
    if(path.startsWith('https://') || path.startsWith('http://')) {
        return path;
    } else {
        let url = path.replace('public/', 'storage/')
        return Url.root_url + '/' + url;
    }
}

export const lowestPrice = (item) => {
    let lowestPrice = 0;

    item.prices.forEach(function (price) {
        if(lowestPrice === 0) {
            lowestPrice = price.pivot.price;
        } else {
            if(price.pivot.price < lowestPrice) {
                lowestPrice = price.pivot.price;
            }
        }
    })

    return item.currency === 'ZAR'
        ?  'R'+ lowestPrice
        :  '$'+ lowestPrice
}

exports.removeFromArray = removeFromArray;
exports.serverImage = serverImage;
exports.lowestPrice = lowestPrice;