import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {App} from "./App";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";


export default {
  title: 'Todo/App',
  component: App,
    decorators: [ReduxStoreProviderDecorator],
    args: {}
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />

export const AppExample = Template.bind({})

