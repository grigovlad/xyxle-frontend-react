import React from 'react';
import {string, array} from 'prop-types';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

import {map} from 'lodash';
import cx from 'classnames';

import 'react-tabs/style/react-tabs.css';
import './Tabs.scss';

const RCTabs = ({className : classNameProp, tabList, tabPanel, ...rest}) => {
  const className = cx('rc-tabs', classNameProp);

  return (
    <Tabs {...rest} className={className}>
      <TabList>
        {map(tabList, (item, index) => (
          <Tab key={`${index}`}>{item}</Tab>
        ))}
      </TabList>

      {map(tabPanel, (item, index) => (
        <TabPanel key={`${index}`}>
          {item}
        </TabPanel>
      ))}
    </Tabs>
  );
};

RCTabs.propTypes = {
  className : string,
  tabList   : array,
  tabPanel  : array
};
RCTabs.defaultProps = {
  className : '',
  tabList   : [],
  tabPanel  : []
};
RCTabs.displayName = 'RCTabs';

export default RCTabs;
