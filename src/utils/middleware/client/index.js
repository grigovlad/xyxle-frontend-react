import RequestFactory from '../request/RequestFactory';

const requestFactory = new RequestFactory();

const clientFactory = options => {
  requestFactory.setOptions(options);

  return {
    get    : payload => requestFactory.get(payload),
    create : payload => requestFactory.post(payload),
    update : payload => requestFactory.put(payload),
    delete : payload => requestFactory.delete(payload)
  };
};

export default clientFactory;
