import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Loader from "./Loader";

export default {
  title: 'Components/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args}/>;

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true
};

export const NotLoading = Template.bind({});
NotLoading.args = {
  isLoading: false
};

