import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './button';

storiesOf('Buttons', module)
  .add('Button', () => <Button title="click me" />)
  .add('Disabled Button', () => <Button disabled={true} title="click me" />);
