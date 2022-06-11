//const fs = require('fs');
//const data = fs.readFileSync('vaporizers.txt', 'utf8');
let vapeList = [];
let table = '';
document.onreadystatechange = function() {
    if(document.readyState === 'interactive') {
        var xmlhttp = new XMLHttpRequest();
        var txt = '';
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
                generateTable(xmlhttp.responseText);
            }
        };
        xmlhttp.open("GET","vaporizers.txt",true);
        xmlhttp.send();        
    }
    function generateTable(txt) {    
        var splitedData = txt.split('\n');
        var i = 0;
        splitedData.forEach(element => {
            vapeList[i++] = {
                title: getTitle(element),
                categories: getCategories(element),
                price: getPrice(element)
            };
        });
        mountHTMLObject();
    }
    function mountHTMLObject() {
        vapeList.forEach(element => {
            if(element.title) {
                table += "<tr>" +
                        "<td>"+element.title+"</td>" +
                        "<td>"+element.categories+"</td>" +
                        "<td>"+element.price+"</td"+
                    "</tr>";
                }
        });
    }
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
    function getNumericValue(text) {
        text = text.substring(text.indexOf("$") +1);
        for(var i =0; i<=text.length; i++) {
            if(isNaN(text.charAt(i)) && text.charAt(i) != '-') {
                return trimValue(text.substring(0,i));
            }
        }
    }
    function trimValue(text) {
        if(text.charAt(text.length-1) == '-') {
            return text.substring(0, text.length-1);
        }
        return text;
    }
    function getCategories(text) {
        var categories = breakLastBrackets(text);
        return categories.split('/');
    }
    function getPrice(text) {
        return getNumericValue(text);
    }
}
window.onload = function() {
    $("#vape-table").append(table);
    $("#vape-table").fancyTable({
        sortColumn:0,
        pagination: true,
        perPage:50,
        globalSearch:false
    });
}