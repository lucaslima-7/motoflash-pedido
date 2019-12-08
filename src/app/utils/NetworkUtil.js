import axios from "axios";

// @see: https://github.com/mzabriskie/axios#axios-api
export function request(baseURL, method, url, config = {}, options = {}) {
  // console.log(config)
  const { params, data, headers, maxContentLength } = config;

  // non-axios specific params
  const { suppressAuth } = options;
  const user = JSON.parse(localStorage.getItem('user'))
  const userToken = user.accessToken

  return new Promise((resolve, reject) => {
    axios({
      method,
      baseURL,
      url,
      params,
      data: data,
      headers: suppressAuth
        ? headers
        : { ...headers, accesstoken: userToken },
      maxContentLength
    })
      .then(response => {
        // console.log(response)
        resolve({
          ...response,
          data: response.data
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function get(baseUrl, url, config, options) {
  return request(baseUrl, "GET", url, config, options);
}

export function post(baseUrl, url, config, options) {
  return request(baseUrl, "POST", url, config, options);
}

export function put(baseUrl, url, config, options) {
  return request(baseUrl, "PUT", url, config, options);
}

// not "delete()" because of reserved word
export function destroy(baseUrl, url, config, options) {
  return request(baseUrl, "DELETE", url, config, options);
}
