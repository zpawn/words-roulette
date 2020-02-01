import React from 'react';
import { action } from '@storybook/addon-actions';

import { DottedMenu } from '../index'

export default {
  title: 'DottedMenu',
};

export const doc = () => <DottedMenu items={[
  {
    title: 'Edit',
    fn: action('EditFn'),
  }, {
    title: 'Remove',
    fn: action('RemoveFn'),
  },
]} />;
