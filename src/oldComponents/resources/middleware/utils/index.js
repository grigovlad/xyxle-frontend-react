import axios from 'axios';
import includes from 'lodash/includes';

const toQueryString = (data = {}) =>
  Object
    .keys(data)
    .filter(key => data[key] || data[key] === 0)
    .map(key => [key, data[key]].map(encodeURIComponent).join('='))
    .join('&');

const getFinalUrl = (url, payload, meta) => {
  let partialUrl = '';

  if (meta?.partialUrl) {
    partialUrl = meta.partialUrl;
  }

  if (includes(url, '?')) {
    return `${url}${partialUrl}${toQueryString(payload)}`;
  }

  return `${url}${partialUrl}?${toQueryString(payload)}`;
};

export const axiosRequest = ({
  url, method, payload = {},
  headers = {}, queryString, isFormData = false,
  authToken
}) => {
  const {meta, ...restPayload} = payload;

  if (!url) {
    return new Promise(resolve => resolve({}));
  }

  const axiosInstance = axios.create({
    headers : {
      ...headers,
      Authorization : `Bearer ${authToken}`
    }
  });

  return axiosInstance[`${method}`.toLowerCase()](getFinalUrl(url, queryString, meta), isFormData ? payload : restPayload)
    .then(({data}) => ({
      ...data
    }))
    .catch(({response: {data}}) => ({
      ...data,
      success : false
    }));
};
