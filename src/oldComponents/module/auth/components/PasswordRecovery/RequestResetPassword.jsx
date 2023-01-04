import React, {useState} from 'react';
import {func} from 'prop-types';
import {useTranslation} from 'react-i18next';

import {useFormik} from 'formik';
import * as yup from 'yup';

import {RequestFactory} from '@resources/middleware';
import {Button, Input, Loader, useToast} from '@shared-components';

import {useSelector} from 'react-redux';
import {getModuleConfigSelector} from '@store/selector/appConfig';

import {MODULE_NAME} from '@constant';


import lockShield from '@assets/img/lock-shield.png';
import checkPaint from '@assets/img/check-paint.png';

const RequestResetPassword = ({setResetPasswordView}) => {
  const [translate] = useTranslation();
  const [isLoading, setIsloading] = useState(false);
  const [isRequestResetSuccess, setIsRequestResetSuccess] = useState(false);
  const {addSuccessToast, addErrorToast} = useToast();
  const config = useSelector(getModuleConfigSelector(MODULE_NAME.AUTH));

  const requestResetPasswordFormSchema = yup.object().shape({
    email : yup.string()
      .email(translate('Email required'))
      .required(translate('This field is required'))
  });

  const handleResponse = ({success, message}) => {
    if (success) {
      addSuccessToast(message);
      setIsRequestResetSuccess(true);
    } else {
      addErrorToast(message);
    }
  };

  const {handleSubmit, handleChange, touched, errors, values} = useFormik({
    validateOnMount : true,
    initialValues   : {
      email : ''
    },
    validationSchema : requestResetPasswordFormSchema,
    onSubmit         : submitValues => {
      setIsloading(true);

      const submitForm = async () => {
        const request = new RequestFactory({resourceUrl : `${config.urlSite}admin/index.php`});
        const response = await request.formDataPost({
          ...submitValues,
          action : 'userChangeForgotPass',
          role   : 'admin'
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
          isRequestResetSuccess ? (
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
            isRequestResetSuccess ? (
              <React.Fragment>
                <h2 className="font-weight-bold color-primary">{translate('Verification email has been sent.')}</h2>
                <p className="normal-font-gray normal-font-bold">Please check your email and click on the recieved link to set a password.</p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h2 className="font-weight-bold color-primary">{translate('Reset your password?')}</h2>
                <p className="normal-font-gray normal-font-bold">
                  Enter the email associated with your account and we will send an email with instructions to reset your password.
                </p>
              </React.Fragment>
            )
          }
        </div>
      </div>
      {!isRequestResetSuccess && <form className="py-2 w-100" onSubmit={handleSubmit}>
        <div className="d-flex flex-column py-2">
          <Input
            className="bg-primary-light p-4"
            error={touched.email && errors.email}
            name="email"
            onChange={handleChange}
            placeholder={translate('Email')}
            value={values.email}
          />
        </div>

        <div className="text-center mt-4">
          <Button className="rc-button" type="submit">
            <span>{translate('Reset Password')}</span>
          </Button>
        </div>
        <div className="text-center mt-3">
          <a
            className="normal-font-bold font-weight-bold color-primary"
            href=""
            onClick={event => {
              event.preventDefault();
              setResetPasswordView(false);
            }}
          >
            &lt; Back to login
          </a>
        </div>

        <Loader isLoading={isLoading} />
      </form>}

      {isRequestResetSuccess && (
        <div className="text-center mt-4">
          <Button
            className="rc-button"
            onClick={() => {
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

RequestResetPassword.displayName = 'RequestResetPassword';

RequestResetPassword.propTypes = {
  setResetPasswordView : func
};
RequestResetPassword.defaultProps = {
  setResetPasswordView : () => null
};

export default RequestResetPassword;
