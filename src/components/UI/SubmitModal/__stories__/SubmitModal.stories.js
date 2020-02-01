import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean } from "@storybook/addon-knobs";

import { SubmitModal } from '..'

export default {
  title: 'SubmitModal',
};

export const doc = () => (
  <SubmitModal
    key={Math.random()}
    isOpen={boolean("isOpen", true)}
    fn={action('SubmitModalFn')}
  />
);
