import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AdminPermissions from './AdminPermissions';

export default {
  title: 'Feature/AdminPermissions',
  component: AdminPermissions,
} as ComponentMeta<typeof AdminPermissions>;

const Template: ComponentStory<typeof AdminPermissions> = (args) => <AdminPermissions></AdminPermissions>;

export const Normal = Template.bind({});
Normal.args = {

};
