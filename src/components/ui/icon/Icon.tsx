import React from 'react';
import {elementType} from "prop-types";

// interface Props extends React.HTMLProps<HTMLElement> {
//   icon: typeof elementType
// }

const Icon: React.FC<any/*Props*/> = props => (
  <span className={`icon ${props.className}`}>
    {props.children}
  </span>
)

// Icon.defaultProps = {
//   icon: undefined,
// }

export default Icon;