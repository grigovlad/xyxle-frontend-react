import React, {useState, useEffect} from 'react';

import {Login, ResetPassword, RequestResetPassword} from '@components';
import {useQueryParams} from '@resources/hooks';

const Auth = () => {
  const {md5key} = useQueryParams();
  const [isRequestResetPasswordDisplayed, setIsRequestResetPasswordDisplayed] = useState(false);
  const [isResetPasswordDisplayed, setIsResetPasswordDisplayed] = useState(null);

  useEffect(() => {
    if (md5key) {
      setIsRequestResetPasswordDisplayed(false);
      setIsResetPasswordDisplayed(true);
    }
  }, [isRequestResetPasswordDisplayed, isResetPasswordDisplayed, md5key]);

  if (isRequestResetPasswordDisplayed) {
    return (
      <RequestResetPassword
        setResetPasswordView={setIsRequestResetPasswordDisplayed}
      />
    );
  }

  if (isResetPasswordDisplayed) {
    return (
      <ResetPassword
        setResetPasswordView={setIsResetPasswordDisplayed}
      />
    );
  }

  return (
    <Login
      setResetPasswordView={setIsRequestResetPasswordDisplayed}
    />
  );
};

Auth.displayName = 'Auth';

export default Auth;
