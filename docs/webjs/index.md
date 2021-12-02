<link rel="stylesheet" href="https://zhmhbest.gitee.io/hellomathematics/style/index.css">
<script src="https://zhmhbest.gitee.io/hellomathematics/style/index.js"></script>

# [WebJS](../index.html)

[TOC]

## XMLHttpRequest

```js
/**
 * @callback onStateChangeCallback
 * @param {number} state
 * @param {XMLHttpRequest} request
 * @param {Event} ev
 * @return {void}
 */

/**
 * @param {string} requestUrl
 * @param {string} requestMethod
 * @param {BodyInit | null} requestBody
 * @param {onStateChangeCallback} stateCallback
 * @return {void}
 */
 const requestBase = (requestUrl, requestMethod, requestBody, stateCallback) => {
    const request = new XMLHttpRequest();
    /**
     * @param {XMLHttpRequest} this
     * @param {Event} ev
     */
    request.onreadystatechange = function (ev) {
        /*readyState
            0 === XMLHttpRequest.UNSENT
            1 === XMLHttpRequest.OPENED
            2 === XMLHttpRequest.HEADERS_RECEIVED
            3 === XMLHttpRequest.LOADING
            4 === XMLHttpRequest.DONE
        */
        stateCallback(this.readyState, this, ev);
    };
    request.open(requestMethod, requestUrl);
    request.send(requestBody);
};

/**
 * @param {string} requestUrl
 * @param {string} [requestMethod]
 * @param {XMLHttpRequestResponseType} [expectType] default json
 * @param {BodyInit | null} [requestBody] default null
 * @param {object} [requestHeaders] default nothing
 * @return {Promise<any>}
 */
const requestCommon = (requestUrl, requestMethod, expectType, requestBody, requestHeaders) => {
    return new Promise((resolve, reject) => {
        requestBase(
            requestUrl,
            (requestMethod || 'GET'),
            (requestBody || null),
            (state, request, ev) => {
                switch (state) {
                    case XMLHttpRequest.OPENED:
                        // 设置接受值
                        request.responseType = expectType || 'json';
                        // 设置请求头
                        if (undefined !== requestHeaders) {
                            for (let key of Object.keys(requestHeaders)) {
                                request.setRequestHeader(key, requestHeaders[key]);
                            }
                        }
                        break;
                    case XMLHttpRequest.DONE:
                        if (
                            request.status >= 200 && request.status < 300 ||
                            304 === request.status /* ReadCache */
                        ) {
                            resolve({
                                header: request.getAllResponseHeaders().split('\n'),
                                data: request.response
                            });
                        } else {
                            reject(new Error(request.statusText));
                        }
                        break;
                }
            }
        );
    });
};
```
