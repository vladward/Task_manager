import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


export default {
  title: 'Todo/EditableSpan',
  component: EditableSpan,
  argTypes: {
    onClick: {
      description: 'value EditableSpan changed'
    },
    value: {
      defaultValue: 'HTML',
      description: 'start value EditableSpan'
    }
  },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
  title: 'HTML',
  setNewTitle: action('value EditableSpan changed')
}
