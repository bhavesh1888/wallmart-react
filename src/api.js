import 'whatwg-fetch';
import axios from 'axios';

function getAPICallObject(method, body, isFileUpload) {
  let headers;
  if (isFileUpload === true) {
    headers = {}
  }else {
    headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
  }
  const requestObj = {
    method,
    mode: 'no-cors',
    headers: new Headers(headers),
  };

  if (body && !isFileUpload) {
    requestObj.body = JSON.stringify(body);
  }
  else if (body && isFileUpload) {
    requestObj.body = body;
  }
  return requestObj;
}

function request(url, options) {
  return fetch(url, options)
    .then(parseJSON);
}

function parseJSON(response) {
  console.log("response:", response);
  return response.json();
}

export const getWallMartData = (locationId, sku) => {
  console.log("api:",locationId, sku);
  let url = `http://wmcas.martjack.com/syncapi/check/location_product_stats/2f9b7c67-7c32-4267-9132-abb503dc4c83/${locationId}/${sku}`;
  return request(url, getAPICallObject('GET'));
};
