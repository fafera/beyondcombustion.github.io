const fs = require('fs');

const data = fs.readFileSync('vaporizers.txt', 'utf8');
var splitedData = data.split('\n');
const vapeList = [];
var i = 0;
splitedData.forEach(element => {
    vapeList[i++] = {
        title: getTitle(element),
        categories: getCategories(element)
    };
});
console.log(vapeList);
function getTitle(element) {
    var title = element.substring(
        element.indexOf("-") +2, 
        element.lastIndexOf("-") -1
    );
    return verifyBrackets(title);
}
function verifyBrackets(title) {
    if(title.indexOf('[') !== -1 || title.indexOf(']') !== -1 ) {
        return breakFirstBrackets(title);
    }
    return title;
    
}
function breakFirstBrackets(title) {
    return title.substring(
        title.indexOf("[")+1, 
        title.indexOf("]")
    );
}
function breakLastBrackets(text) {
    return text.substring(
        text.lastIndexOf("[") + 1  , 
        text.lastIndexOf("]")
    );
}
function getCategories(text) {
    var categories = breakLastBrackets(text);
    return categories.split('/');
}