import {useMemo} from 'react';
import {useLocation} from 'react-router-dom';

const useQueryParams = () => {
  const {search} = useLocation();

  const queryParams = useMemo(() => {
    const urlSearcParams = new URLSearchParams(search);

    let obj = {};

    for (const queryParam of urlSearcParams) {
      obj[queryParam[0]] = queryParam[1];
    }

    return obj;
  }, [search]);

  return queryParams;
};

export default useQueryParams;
