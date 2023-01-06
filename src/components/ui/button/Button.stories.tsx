import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Click me</Button>;

export const Normal = Template.bind({});
Normal.args = {
  size: 'normal'
};

export const SmallReversed = Template.bind({});
SmallReversed.args = {
  size: 'small',
  className: 'rc-button--reversed'
};

export const BigSecondary = Template.bind({});
BigSecondary.args = {
  size: 'big',
  className: 'secondary'
};
