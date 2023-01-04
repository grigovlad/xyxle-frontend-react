import React, {useMemo} from 'react';

import {mapKeys} from 'lodash';
import cx from 'classnames';

import en from '@assets/img/en.png';
import de from '@assets/img/de.png';
import fr from '@assets/img/fr.png';
import it from '@assets/img/it.png';

export const langImgMap = {
  en,
  de,
  fr,
  it
};

export const useLangTabs = ({className : classNameProp} = {}) => {
  const className = cx(classNameProp);

  const langTabs = useMemo(() => {
    const list = [];

    mapKeys(langImgMap, (img, lang) => {
      list.push((
        <div className="d-flex">
          <img
            alt={lang}
            className={className}
            key={lang}
            src={img}
            width="15px"
          />
          <span className="ml-2">{String(lang).toUpperCase()}</span>
        </div>
      ));
    });

    return list;
  }, [className]);

  return langTabs;
};
