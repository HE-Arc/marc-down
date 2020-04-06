// Based on https://github.com/RedMser/discotron/blob/webapi-rest/dashboard/www/scripts/utils/utils.js
/**
 * Make a HTTP request on the specified URL, with data encoded as json
 * @param {string} verb HTTP verb to send request with
 * @param {string} url Url to make the post request on
 * @param {object} [body] Data that will be JSON.stringified and sent to the website. Will be converted as URL params for GET requests, which will convert everything to string.
 * @returns {Promise} resolve(data {object|string}) data: object if could parse JSON, reject()
 */
export default function query(url, verb = "GET", body = undefined) {
    const headers = { "Content-Type": "application/json" };

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