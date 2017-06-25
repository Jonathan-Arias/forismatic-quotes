window.onload = () => {
    var http = new XMLHttpRequest();

    // Forismatic documentation: http://forismatic.com/en/api/
    http.open('GET', 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en', true);
    http.send();

    function processHTTP(http) {
        http.onreadystatechange = () => {
            // 4: request is complete, 200: OK
            if (http.readyState == 4 && http.status == 200) {
            	try {
            		var forismatic = JSON.parse(http.response);
            		console.log(forismatic);
            	}
            	catch(err) {
            		console.log(err);
            	}
                document.getElementById("quote").innerHTML = forismatic.quoteText;
                document.getElementById("author").innerHTML = forismatic.quoteAuthor !== '' ? forismatic.quoteAuthor: 'Unknown';
            }
        }
    }

    processHTTP(http);

    var btn = document.getElementById("newQuote");

    // Clicking the button gets a new quote from Forismatic
    btn.addEventListener("click", function() {
        http.open('GET', 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en', true);
        http.send();

        processHTTP(http);
    });

}