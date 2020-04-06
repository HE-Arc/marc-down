// Based on work done https://github.com/forwards-long-jump/discotron
/**
 * Make a HTTP request on the specified URL, with data encoded as json
 * @param {string} url Url to make the post request on
 * @param {string} [verb="GET"] HTTP verb to send request with
 * @param {object} [body] Data that will be JSON.stringified and sent to the website. Will be converted as URL params for GET requests, which will convert everything to string.
 * @returns {Promise} resolve(data {object|string}) data: object if could parse JSON, reject()
 */
export default function query(url, verb = "GET", body = undefined) {
    const headers = { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") };

    const request = {
        method: verb,
        headers: headers,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer",
    };

    // Get cannot have a body, but we want to easily be able to use an object in the parameters
    if (verb === "GET") {
        url += "?" + new URLSearchParams(body).toString();
        body = undefined; // Unset the body as get cannot have one
    }

    if (body !== undefined) {
        request.body = JSON.stringify(body);
    }

    // Because I can't bother fixing await and async with react, it gives me weird errors
    return new Promise((resolve, reject) => {
        fetch(url, request).then((response) => {
            resolve(response.json());
        });
    });
}

// Source: https://docs.djangoproject.com/en/3.0/ref/csrf/#setting-the-token-on-the-ajax-request
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}