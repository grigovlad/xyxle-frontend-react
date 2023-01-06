import {axiosRequest} from '../utils';

export default class RequestFactory {
  constructor ({resourceUrl = '', authToken = ''} = {}) {
    this.resourceUrl = resourceUrl;
    this.authToken = authToken;
  }

  setOptions ({resourceUrl, authToken}) {
    this.resourceUrl = resourceUrl;
    this.authToken = authToken;
  }

  request ({...rest}, method) {
    return axiosRequest({
      url       : this.resourceUrl,
      authToken : this.authToken,
      method,
      ...rest
    });
  }

  get (payload) {
    return this.request({queryString : payload}, 'get');
  }

  post (payload) {
    return this.request({payload}, 'post');
  }

  formDataPost (payload) {
    const formData = new FormData();

    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        formData.append(key, payload[key]);
      }
    }

    return this.request({
      payload : formData,
      headers : {
        'Content-Type' : 'multipart/form-data'
      },
      isFormData : true
    }, 'post');
  }

  put (payload) {
    return this.request({payload}, 'put');
  }

  delete (payload) {
    return this.request({payload}, 'delete');
  }
}
