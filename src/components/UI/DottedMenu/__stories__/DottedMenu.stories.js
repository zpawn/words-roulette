import React from "react";
import { action } from "@storybook/addon-actions";

import { DottedMenu } from "../index";

export default {
  title: 'DottedMenu',
};

export const doc = () => (
  <DottedMenu items={[
    {
      title: 'Item1',
      fn: action('Item1Fn'),
    }, {
      title: 'Item2',
      fn: action('Item2Fn'),
    },
  ]} />
);
