import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {string, func, node} from 'prop-types';
import cx from 'classnames';

import {VscCheck, VscError, VscWarning} from 'react-icons/vsc';

import './Toast.scss';

const ToastContext = React.createContext();

const ICON_TYPE_MAP = {
  success : <VscCheck />,
  error   : <VscError />,
  warning : <VscWarning />
};

const Toast = ({content, type, onDismiss, className: classNameProp}) => {
  const [translate] = useTranslation();
  const className = cx('rc-toast row', classNameProp, type);

  return (
    <div className={className} onClick={onDismiss}>
      <div className="col-2 d-flex justify-content-center align-items-center icon p-0">{ICON_TYPE_MAP[type]}</div>
      <div className="col-10 d-flex flex-column justify-content-center align-items-start p-0">
        <h5 className="header pt-3 pr-3 pb-2 m-0 normal-font-bold">{translate(type)}</h5>
        <div className="content pr-3 pb-3 normal-font-gray normal-font-bold normal-font-small">
          {content}
        </div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  children  : node,
  className : string,
  content   : node,
  onDismiss : func,
  type      : string
};
Toast.defaultProps = {
  content   : null,
  type      : 'success',
  children  : null,
  className : '',
  onDismiss : () => false
};
Toast.displayName = 'Button';

const TOAST_TIME_SHOW = 2000;

let toastCount = 0;

export const ToastProvider = ({children}) => {
  const [toasts, setToasts] = React.useState([]);

  const removeToast = id => {
    setToasts(currentToasts => currentToasts.filter(toastItem => toastItem.id !== id));
  };

  const addToast = ({type, content}) => {
    const id = toastCount;
    const toast = {
      type,
      content,
      id
    };

    toastCount += 1;

    setToasts(currentToasts => [...currentToasts, toast]);

    setTimeout(() => {
      removeToast(id);
    }, TOAST_TIME_SHOW);
  };

  return (
    <ToastContext.Provider value={{
      addToast,
      removeToast
    }}
    >
      {children}
      <div className="rc-toast-container">
        {toasts.map(({type, content, id, ...rest}) => (
          <Toast
            content={content}
            key={id}
            onDismiss={removeToast}
            type={type}
            {...rest}
            Toast={Toast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children : node
};
ToastProvider.defaultProps = {
  children : null
};
ToastProvider.displayName = 'ToastProvider';

export const useToast = () => {
  const {addToast} = React.useContext(ToastContext);

  return useMemo(() => ({
    addSuccessToast : content => addToast({
      type : 'success',
      content
    }),
    addErrorToast : content => addToast({
      type : 'error',
      content
    }),
    addWarningToast : content => addToast({
      type : 'warning',
      content
    })
  }), []); // eslint-disable-line
};
