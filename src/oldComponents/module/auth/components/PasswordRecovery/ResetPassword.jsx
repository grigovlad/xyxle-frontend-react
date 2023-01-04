import React, {useState, useRef} from 'react';
import {useSearchParams} from 'react-router-dom';
import {func} from 'prop-types';
import {useTranslation} from 'react-i18next';

import {useFormik} from 'formik';
import * as yup from 'yup';

import {useQueryParams} from '@resources/hooks';
import {RequestFactory} from '@resources/middleware';
import {Button, Input, Loader, useToast} from '@shared-components';

import {useSelector} from 'react-redux';
import {getModuleConfigSelector} from '@store/selector/appConfig';

import {MODULE_NAME} from '@constant';

import lockShield from '@assets/img/lock-shield.png';
import checkPaint from '@assets/img/check-paint.png';

const getInitialValues = () => ({
  password        : '',
  confirmPassword : ''
});

const ResetPassword = ({setResetPasswordView}) => {
  const [translate] = useTranslation();
  const [, setSearchParams] = useSearchParams();
  const queryParams = useQueryParams();
  const [isLoading, setIsloading] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const {addSuccessToast, addErrorToast} = useToast();
  const config = useSelector(getModuleConfigSelector(MODULE_NAME.AUTH));

  const initialValues = useRef(getInitialValues());

  const forgotPasswordFormSchema = yup.object().shape({
    password        : yup.string().required(translate('This field is required')),
    confirmPassword : yup.string()
      .required(translate('This field is required'))
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  });

  const handleResponse = ({success, message}) => {
    if (success) {
      addSuccessToast(message);
      setIsResetSuccess(true);
    } else {
      addErrorToast(message);
    }
  };

  const {handleSubmit, handleChange, touched, errors, values} = useFormik({
    validateOnMount  : true,
    initialValues    : initialValues.current,
    validationSchema : forgotPasswordFormSchema,
    onSubmit         : submitValues => {
      setIsloading(true);

      const submitForm = async () => {
        const request = new RequestFactory({resourceUrl : `${config.urlSite}admin/index.php`});
        const response = await request.formDataPost({
          ...submitValues,
          ...queryParams,
          action : 'userPasswordRecovery'
        });

        handleResponse(response);

        setIsloading(false);
      };

      submitForm();
    }
  });

  return (
    <section className="d-flex align-items-center flex-column">
      <div className="d-flex justify-content-between">
        {
          isResetSuccess ? (
            <img
              alt="Lock shield" className="mr-4"
              height="105px" src={checkPaint}
            />
          ) : (
            <img
              alt="Lock shield" className="mr-4"
              height="105px" src={lockShield}
            />
          )
        }
        <div className="d-flex align-items-start flex-column">
          {
            isResetSuccess ? (
              <React.Fragment>
                <h2 className="font-weight-bold color-primary">{translate('Success! Your password is set.')}</h2>
                <p className="normal-font-gray normal-font-bold">You can now proceed to log into your account.</p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h2 className="font-weight-bold color-primary">{translate('Set your account password')}</h2>
                <p className="normal-font-gray normal-font-bold">Enter your new account password in the fields below</p>
              </React.Fragment>
            )
          }
        </div>
      </div>
      {!isResetSuccess && <form className="position-relative py-2 w-100" onSubmit={handleSubmit}>
        <div className="d-flex flex-column py-2 pb-3">
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
        <div className="d-flex flex-column py-2">
          <Input
            className="bg-primary-light p-4"
            error={touched.confirmPassword && errors.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            placeholder={translate('Confirm password')}
            type="password"
            value={values.confirmPassword}
          />
        </div>

        <div className="text-center mt-4">
          <Button className="rc-button" type="submit">
            <span>{translate('Set Password')}</span>
          </Button>
        </div>
        <div className="text-center mt-3">
          <a
            className="normal-font-bold font-weight-bold color-primary"
            href=""
            onClick={event => {
              event.preventDefault();
              setSearchParams({});
              setResetPasswordView(false);
            }}
          >
            &lt; Back to login
          </a>
        </div>

        <Loader isLoading={isLoading} />
      </form>}

      {isResetSuccess && (
        <div className="text-center mt-4">
          <Button
            className="rc-button"
            onClick={() => {
              setSearchParams({});
              setResetPasswordView(false);
            }}
          >
            <span>{translate('Back to login')}</span>
          </Button>
        </div>
      )}
    </section>
  );
};

ResetPassword.displayName = 'ResetPassword';

ResetPassword.propTypes = {
  setResetPasswordView : func
};
ResetPassword.defaultProps = {
  setResetPasswordView : () => null
};

export default ResetPassword;
