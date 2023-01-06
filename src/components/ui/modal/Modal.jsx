import React from 'react';
import {string, elementType, bool, func} from 'prop-types';
import cx from 'classnames';
import Button from '../button/Button';

import './Modal.scss';

// eslint-disable-next-line complexity
const Modal = ({
  cancelText, confirmText, content, className : classNameProp, icon: Icon,
  isVisible, onCancel, onConfirm, title, hasCustomContent,
  customContent: CustomContent
}) => {
  const className = cx('rc-modal', classNameProp);

  if (!isVisible) {
    return null;
  }

  if (hasCustomContent) {
    return (
      <section className={className}>
        <div className="rc-modal-body">
          <CustomContent />
        </div>
      </section>
    );
  }

  return (
    <section className={className}>
      <div className="rc-modal-body">
        <div className="rc-modal--header text-center my-3">
          {Icon && <Icon className="icon icon--large mb-3" />}
          {title && <h5 className="text-center">{title}</h5>}
        </div>
        <div className="rc-modal--content my-4">
          <p className="text-center">{content}</p>
        </div>
        <div className="rc-modal--actions text-center my-4">
          {onCancel && <Button className="rc-button--small rc-button--reversed secondary" onClick={onCancel}>
            <span>{cancelText}</span>
          </Button>}
          {onConfirm && <Button className="rc-button--small secondary ml-2" onClick={onConfirm}>
            <span>{confirmText}</span>
          </Button>}
        </div>
      </div>
    </section>
  );
};

Modal.propTypes = {
  cancelText  : string,
  className   : string,
  confirmText : string,
  content     : string,

  customContent    : elementType,
  hasCustomContent : bool,

  icon      : elementType,
  isVisible : bool,
  onCancel  : func,
  onConfirm : func,
  title     : string
};
Modal.defaultProps = {
  cancelText  : '',
  className   : '',
  confirmText : '',
  content     : '',

  customContent    : () => null,
  hasCustomContent : false,

  icon      : null,
  isVisible : false,
  onCancel  : null,
  onConfirm : null,
  title     : ''
};
Modal.displayName = 'Modal';

export default Modal;
