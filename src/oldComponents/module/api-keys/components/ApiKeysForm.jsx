import React, {useState, useCallback, useRef} from 'react';
import {string, object, func} from 'prop-types';
import {useTranslation} from 'react-i18next';

import reduce from 'lodash/reduce';
import cx from 'classnames';

import {useFormik} from 'formik';
import * as yup from 'yup';

import {FaReply} from 'react-icons/fa';

import {useMiddleware} from '@resources/middleware';
import {Button, Input, Loader, useToast} from '@shared-components';

import {MODULE_NAME, VIEW_MODE} from '@constant';

const getInitialValues = itemToEdit => ({
  id          : itemToEdit ? itemToEdit.id : '',
  key         : itemToEdit ? itemToEdit.key : '',
  description : itemToEdit ? itemToEdit.description : ''
});

const ApiKeysForm = ({viewMode, setItemToEdit, setViewMode, itemToEdit}) => {
  const [translate] = useTranslation();
  const [isLoading, setIsloading] = useState(false);
  const {addSuccessToast, addErrorToast} = useToast();

  const middleware = useMiddleware(MODULE_NAME.API_KEYS);

  const onReturnHandler = useCallback(() => {
    setItemToEdit(null);
    setViewMode(VIEW_MODE.LIST);
  }, [setItemToEdit, setViewMode]);

  const apiKeysFormSchema = yup.object().shape({
    key         : yup.string().required(translate('This field is required')),
    description : yup.string().required(translate('This field is required'))
  });

  const initialValues = useRef(getInitialValues(itemToEdit));

  const handleResponse = ({error}) => {
    if (error) {
      addErrorToast(reduce(error, (acc, errorItem) => `${acc} ${errorItem.message}`, ''));

      return;
    }

    addSuccessToast(translate('Api Key Saved Successfuly'));
  };

  const {handleSubmit, handleChange, touched, errors, values} = useFormik({
    validateOnMount  : true,
    initialValues    : initialValues.current,
    validationSchema : apiKeysFormSchema,
    onSubmit         : submitValues => {
      setIsloading(true);

      const submitForm = async () => {
        const {data} = viewMode === VIEW_MODE.EDIT ? await middleware.update({
          ...submitValues,
          meta : {
            partialUrl : `/${submitValues.id}`
          }
        }) : await middleware.create({
          ...submitValues
        });

        handleResponse(data);

        setIsloading(false);
      };

      submitForm();
    }
  });

  return (
    <React.Fragment>
      <div className="text-right">
        <Button className="rc-button--small rc-button--reversed" onClick={onReturnHandler}>
          <FaReply />
          <span className="ml-2">{translate('Return')}</span>
        </Button>
      </div>

      <hr />

      <form className="position-relative py-2" onSubmit={handleSubmit}>
        <div className="row  mb-2">
          <label className={cx('col-3 rc-input--label', {'rc-input--error' : touched.key && errors.key})}>
            {translate('Api Key')}
          </label>
          <div className="col-9">
            <Input
              error={touched.key && errors.key}
              isDisabled
              name="key"
              onChange={handleChange}
              value={values.key}
            />
          </div>
        </div>
        <div className="row mb-2">
          <label className={cx('col-3 rc-input--label', {'rc-input--error' : touched.description && errors.description})}>
            * {translate('Description')}
          </label>
          <div className="col-9">
            <Input
              error={touched.description && errors.description}
              name="description"
              onChange={handleChange}
              value={values.description}
            />
          </div>
        </div>

        <div className="text-right mt-4">
          <Button className="rc-button--small rc-button--reversed">
            <span>{translate('Reset')}</span>
          </Button>
          <Button className="rc-button--small ml-2" type="submit">
            <span>{translate('Save')}</span>
          </Button>
        </div>

        <Loader isLoading={isLoading} />
      </form>
    </React.Fragment>
  );
};

ApiKeysForm.propTypes = {
  itemToEdit    : object,
  setItemToEdit : func.isRequired,
  setViewMode   : func.isRequired,
  viewMode      : string.isRequired
};
ApiKeysForm.defaultProps = {
  itemToEdit : null
};

ApiKeysForm.displayName = 'ApiKeysForm';

export default ApiKeysForm;
