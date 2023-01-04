import RequestFactory from './request/RequestFactory';

import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {getModuleConfigSelector} from '@store/selector/appConfig';
import clientFactory from './client';

export const useMiddleware = moduleName => {
  const config = useSelector(getModuleConfigSelector(moduleName));

  return useMemo(() => ({
    ...clientFactory(config)
  }), [config]);
};

export {
  RequestFactory
};
