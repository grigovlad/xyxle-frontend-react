import React, {useState, useRef} from 'react';
import {func} from 'prop-types';
import {useTranslation} from 'react-i18next';

import {useFormik} from 'formik';
import * as yup from 'yup';

import {RequestFactory} from '@resources/middleware';
import {Button, Input, Checkbox, Loader, useToast} from '@shared-components';

import {useSelector} from 'react-redux';
import {getModuleConfigSelector} from '@store/selector/appConfig';

import {MODULE_NAME} from '@constant';
import reduce from "lodash/reduce";

const getInitialValues = () => ({
  email   : '',
  password   : '',
  twoFACode  : '',
  rememberMe : false
});

const Login = ({setResetPasswordView}) => {
  const [translate] = useTranslation();
  const [isLoading, setIsloading] = useState(false);
  const [is2FAVisible, setIs2FAVisible] = useState(false);
  const {addSuccessToast, addErrorToast} = useToast();
  const config = useSelector(getModuleConfigSelector(MODULE_NAME.AUTH));

  const initialValues = useRef(getInitialValues());

  const loginFormSchema = yup.object().shape({
    email  : yup.string().required(translate('This field is required')).email(translate('This field must be a valid email')),
    password  : yup.string().required(translate('This field is required')),
    twoFACode : yup.string().when('email', () => {
      if (is2FAVisible) {
        return yup.string().required(translate('This field is required'));
      }

      return yup.string();
    })
  });

  const handleResponse = response => {
    if(response.errors){
      addErrorToast(reduce(response.errors, (acc, errorItem) => `${acc} ${errorItem.message}`, ''));

      return;
    }
    // setIs2FAVisible(true);
  };

  const {handleSubmit, handleChange, touched, errors, values} = useFormik({
    validateOnMount  : true,
    initialValues    : initialValues.current,
    validationSchema : loginFormSchema,
    onSubmit         : submitValues => {
      setIsloading(true);

      const submitForm = async () => {
        const request = new RequestFactory({resourceUrl : `${config.urlSite}admin/index.php`});
        const {data} = await request.formDataPost({
          ...submitValues,
          action : 'userLogin',
          role   : 'admin'
        });

        handleResponse(data);

        setIsloading(false);
      };

      submitForm();
    }
  });

  if (is2FAVisible) {
    return (
      <section className="d-flex align-items-center flex-column">
        <p className="normal-font-large font-weight-bold text-center">
          {translate('Additional verification required. Scan the QR code below with the Google Authenticator mobile app:')}
        </p>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQMAAACXljzdAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACEklEQVRYheWXwW3DQAwEaeRxT5WgTqzGBNiAGrM7uRL0vIcgZpanxCogZoDkHpasvceCXC5Js792nFPNBn/YRy1Pb7y674lIM76068CXxctjsOtwN7tmIpMv4mYTlOzicaOlI74PbVrnEU7Q/A2EqJTIj69lT0eUH+RRJBUIQvOcuQQkNEpIypPo8MPrWb0JSByIBR2e5ftjFgKRxR1OF99GtNo5PhIRqmMzZIFI0CoKedhsqQiyvMFN9OYRwQbHCFEWgjdtfCE63LDp4JaJuKICoijhFAM0l0O9P4pEwFv0hRAF1TmP8ScLgcYHoV+ViIoe5Ac9C1mIsmC9M3kFpiC3XKS7sq/tyI86VD359fsRu6yztd4Tq9qj8tMsEekdaWcuoAZCo6rOPRHBBslH+IGUEq48hkUnIos0+pUfNOq9O6chk9/FzaJLO45BvqJOsxBxqUxn3TEml0vX7mJJiAIxHvWKRxEaufM1EYHGrWo+nHqJlJeTJyFN0/krPxrUrOfnhxHrrmx9LqU6ufm9lyQh+EA4EopEiVz6aldJyIQPKO9HFmI+9UwkjkSwx3bIRMzTLBHpXDQR0yPpjbEZlT0Rib2kVyUdSbtZ9IlMRNqUKWga1H4iskfmMhF1JLqz6lXzge/piA2A9xGCMRG/ZpcMJDzqKW4Ky0p07ufN9f1I30+5cdFeEhw3O22u70f+y/kEN3VzW5qzWaQAAAAASUVORK5CYII=" />
        <p className="normal-font-large font-weight-bold text-center">
          {translate('This will enable 2FA for your account. Once scanned, enter the correct code below:')}
        </p>
        <form className="position-relative py-2 w-100" onSubmit={handleSubmit}>
          <div className="d-flex flex-column py-2 pb-3">
            <Input
              className="bg-primary-light p-4"
              error={touched.twoFACode && errors.twoFACode}
              name="twoFACode"
              onChange={handleChange}
              placeholder={translate('Authenticator code')}
              value={values.twoFACode}
            />
          </div>

          <div className="text-center mt-4">
            <Button className="rc-button--big" type="submit">
              <span>{translate('Sign in')}</span>
            </Button>
          </div>

          <div className="text-center mt-3">
            <a
              className="normal-font-bold font-weight-bold color-primary"
              href=""
              onClick={event => {
                event.preventDefault();
                setIs2FAVisible(false);
              }}
            >
              &lt; Back to login
            </a>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section className="d-flex align-items-center flex-column">
      <h2 className="mb-5 font-weight-bold color-primary">{translate('Administration panel')}</h2>
      <form className="py-2 w-100" onSubmit={handleSubmit}>
        <div className="d-flex flex-column py-2 pb-3">
          <Input
            className="bg-primary-light p-4"
            error={touched.email && errors.email}
            name="email"
            onChange={handleChange}
            placeholder={translate('Email')}
            value={values.email}
          />
        </div>
        <div className="d-flex flex-column py-2">
          <Input
            className="bg-primary-light p-4"
            error={touched.password && errors.password}
            name="password"
            onChange={handleChange}
            placeholder={translate('Password')}
            type="password"
            value={values.password}
          />
        </div>

        <div className="d-flex align-items-center justify-content-between p-4">
          <div className="">
            <Checkbox
              checked={values.rememberMe}
              name="rememberMe"
              onChange={handleChange}
            />
            <label className="normal-font-small color-primary ml-2" htmlFor="rememberMe">
              {translate('Remember me')}
            </label>
          </div>
          <div className="">
            <a
              className="color-primary"
              href=""
              onClick={event => {
                event.preventDefault();
                setResetPasswordView(true);
              }}
            >
              Forgot Password?
            </a>
          </div>
        </div>

        <div className="text-center mt-4">
          <Button className="rc-button--big" type="submit">
            <span>{translate('Sign in')}</span>
          </Button>
        </div>

        <Loader isLoading={isLoading} />
      </form>
    </section>
  );
};

Login.displayName = 'Login';

Login.propTypes = {
  setResetPasswordView : func
};
Login.defaultProps = {
  setResetPasswordView : () => null
};

export default Login;
