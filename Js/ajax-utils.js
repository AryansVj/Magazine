// LECTURE 57
// Utiliy Library

(function (global) {

    var ajaxUtils = {};     // Set up a namespace
    
    // Obtain an Ajax request object
    function getRequestObject () {
        if (window.XMLHttpRequest) {        // Check for the available object for request
            return (new XMLHttpRequest());
        }
        else if (window.ActiveXObject) {    // Optional - for very old IE browsers
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        }
        else {
            global.alert("Ajax is not supported!");
            return (null);
        }
    }

    // var request = getRequestObject();    - This causes an Erase Condition. Thus declared inside the below function

    // Create and Send the request to the server
    ajaxUtils.sendGetRequest = function(requestUrl, responseHandler, isJsonResponse) {
        var request = getRequestObject();
        request.onreadystatechange = function () {      // To be invoked when the states change (Behaviour to the response)
            handleResponse(request, responseHandler, isJsonResponse);   // responseHandler is provided by the user (what to do with response)
        };

        request.open("GET", requestUrl, true);  // open a GET request to request url asynchronously(true)
        request.send(null);                     // Post request: the body is null unless there are any name,value pairs to send
    }
    
    // link the user provided behavior with the response if everything is ok
    function handleResponse(request, responseHandler, isJsonResponse) { 
        if ((request.readyState == 4) && (request.status == 200)) {     // ready state '4: request finished and response is ready', status '200: "OK"

            // if not defined, set default to true
            if (isJsonResponse === undefined) {
                isJsonResponse = true;
            }
            else if (isJsonResponse == true) {
                responseHandler(JSON.parse(request.responseText));
            }
            else {
                responseHandler(request.responseText);
            }
        }
    }

    global.$ajaxUtils = ajaxUtils;

}) (window);