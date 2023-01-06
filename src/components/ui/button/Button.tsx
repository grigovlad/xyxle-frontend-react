import React, {ReactNode} from 'react';
import './Button.scss';

interface Props {
  size?: "normal" | "small" | "big",
  type?: "button" | "submit" | "reset" | undefined,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children?: ReactNode
}

export const Button: React.FC<Props> = props => (
  <button type={props.type} className={`rc-button button--${props.size} rc-button--${props.size} ${props.className ? props.className : ''}`}>
    {props.children}
  </button>
)

Button.defaultProps = {
  size: 'normal',
  type: 'button'
}

export default Button;


