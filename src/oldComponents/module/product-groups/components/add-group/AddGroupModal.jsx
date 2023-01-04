import React, {useEffect, useState, useMemo} from 'react';
import {bool, func, object} from 'prop-types';
import {useTranslation} from 'react-i18next';

import {MODULE_NAME} from '@constant';

import {useFormik} from 'formik';
import * as yup from 'yup';

import {useMiddleware} from '@resources/middleware';
import {Button, Input, Tabs, useLangTabs, langImgMap, Loader} from '@shared-components';

import {mapKeys} from 'lodash';

import cx from 'classnames';
import './AddGroupModal.scss';

const AddGroupModal = ({isVisible, setIsVisible, itemToEdit, handleResponse}) => {
  const [translate] = useTranslation();
  const middleware = useMiddleware(MODULE_NAME.PRODUCT_GROUPS);
  const [isLoading, setIsloading] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const title = itemToEdit ? translate('Edit group') : translate('Add new group');

  const initialValues = useMemo(() => {
    const initialValuesTemp = {
      id          : itemToEdit ? itemToEdit.id : '',
      description : itemToEdit ? itemToEdit.description : ''
    };

    mapKeys(langImgMap, (img, lang) => {
      initialValuesTemp[`${lang}Name`] = itemToEdit ? itemToEdit[`${lang}Name`] : '';
      initialValuesTemp[`${lang}Description`] = itemToEdit ? itemToEdit[`${lang}Description`] : '';
    });

    return initialValuesTemp;
  }, [itemToEdit]);

  const apiKeysFormSchema = yup.object().shape({
    enName : yup.string().required(translate('This field is required'))
  });

  const {handleSubmit, handleChange, touched, errors, values, isValid, isValidating, isSubmitting} = useFormik({
    validateOnMount  : true,
    initialValues,
    validationSchema : apiKeysFormSchema,
    onSubmit         : submitValues => {
      setIsloading(true);

      const submitForm = async () => {
        const {data} = itemToEdit ? await middleware.update({
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

  useEffect(() => {
    if (!isValid && !isValidating && isSubmitting) {
      // Find tab that has errors, in this case it is always the first one
      setSelectedTabIndex(0);
    }
  }, [isSubmitting, isValid, isValidating]);

  const tabList = useLangTabs();

  const panelList = useMemo(() => {
    const list = [];

    mapKeys(langImgMap, (img, lang) => {
      list.push(
        <React.Fragment key={lang}>
          <div className="row  mb-2">
            <label className={cx('col-3 rc-input--label', {'rc-input--error' : touched[`${lang}Name`] && errors[`${lang}Name`]})}>
              {translate('Group name')}
              <span className="ml-2">[{String(lang).toUpperCase()}]</span>
            </label>
            <div className="col-9">
              <Input
                error={touched[`${lang}Name`] && errors[`${lang}Name`]}
                name={`${lang}Name`}
                onChange={handleChange}
                value={values[`${lang}Name`]}
              />
            </div>
          </div>
          <div className="row mb-2">
            <label className={cx('col-3 rc-input--label', {'rc-input--error' : touched[`${lang}Description`] && errors[`${lang}Description`]})}>
              {translate('Group escription')}
              <span className="ml-2">[{String(lang).toUpperCase()}]</span>
            </label>
            <div className="col-9">
              <Input
                error={touched[`${lang}Description`] && errors[`${lang}Description`]}
                isTextArea
                name={`${lang}Description`}
                onChange={handleChange}
                value={values[`${lang}Description`]}
              />
            </div>
          </div>
        </React.Fragment>
      );
    });

    return list;
  }, [errors, handleChange, touched, translate, values]);

  if (!isVisible) {
    return null;
  }

  return (
    <section className="rc-modal add-group-modal">
      <div className="rc-modal-body position-relative">
        <div className="modal-content">
          <div className="modal-header d-flex align-items-center justify-content-between">
            <h5 className="text-center m-0">{title}</h5>
            <button className="close medium m-0 p-0" onClick={() => setIsVisible(false)}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form className="py-2" onSubmit={handleSubmit}>
              <Tabs
                onSelect={index => setSelectedTabIndex(index)}
                selectedIndex={selectedTabIndex}
                tabList={tabList}
                tabPanel={panelList}
              />

              <div className="modal-footer d-flex align-items-center justify-content-between mt-4">
                <Button className="rc-button--reversed" onClick={() => setIsVisible(false)}>
                  <span>{translate('Cancel')}</span>
                </Button>
                <Button type="submit">
                  <span>{translate('Save group')}</span>
                </Button>
              </div>

              <Loader isLoading={isLoading} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

AddGroupModal.propTypes = {
  handleResponse : func,
  isVisible      : bool,
  itemToEdit     : object,
  setIsVisible   : func
};
AddGroupModal.defaultProps = {
  handleResponse : () => null,
  isVisible      : false,
  itemToEdit     : null,
  setIsVisible   : () => null
};
AddGroupModal.displayName = 'AddGroupModal';

export default AddGroupModal;
