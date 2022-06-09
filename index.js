//const fs = require('fs');
//const data = fs.readFileSync('vaporizers.txt', 'utf8');
var source = window.open('https://github.com/fafera/The-Consensus/blob/https://fafacapellari.com/source/vaporizers.txt');
var xmlhttp = new XMLHttpRequest();
var txt = '';
xmlhttp.onreadystatechange = function(){
    if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
        txt = xmlhttp.responseText;
    }
};
xmlhttp.open("GET","vaporizers.txt",true);
xmlhttp.send();

window.onload = function() {
    var splitedData = txt.split('\n');
    const vapeList = [];
    var i = 0;
    splitedData.forEach(element => {
        vapeList[i++] = {
            title: getTitle(element),
            categories: getCategories(element),
        };
    });
    //console.log(vapeList);
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
    function generateTable() {
        var table = '';
        vapeList.forEach(element => {
            if(element.title) {
                table += "<tr>" +
                        "<td>"+element.title+"</td>" +
                        "<td>"+element.categories+"</td>" +
                    "</tr>";
                }
        });
        return table;
    }
    var table = generateTable();
    $("#vape-table").append(table);
    //var htmlTable = document.getElementById('vape-table');
    //htmlTable.append(table);
    //htmlTable.outerHTML = table;
    $("#vape-table").fancyTable({
        sortColumn:0,
        pagination: true,
        perPage:50,
        globalSearch:false
    });
}