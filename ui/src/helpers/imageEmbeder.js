const strip =  html => 
{  
    var tmp = document.createElement("DIV"); 
    tmp.innerHTML = html; 
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;   
    return tmp.innerText.replace(urlRegex, function(url) {     
        return '\n' + url 
    })
} 

const renderHTML = text => { 
    var rawText = strip(text)
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;   

    return {
        __html: rawText.replace(urlRegex, function (url) {
            
            if ((url.indexOf(".jpg") > 0) || (url.indexOf(".png") > 0) || (url.indexOf(".gif") > 0)) {
                return '<img src="' + url + '">' + '<br/>'
            } else {
                return '<a href="' + url + '">' + url + '</a>' + '<br/>'
            }
        })
    }
} 

export default renderHTML;