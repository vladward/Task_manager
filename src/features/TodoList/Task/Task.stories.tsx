import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../stories/decorators/ReduxStoreProviderDecorator";


export default {
  title: 'Todo/Task',
  component: Task,
    decorators: [ReduxStoreProviderDecorator],
    args: {
        todolistId: 'todolistId1',
        taskId: '1'
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />

export const TaskExample = Template.bind({})

