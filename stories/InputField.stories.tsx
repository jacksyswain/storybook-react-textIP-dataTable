import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import InputField from '../src/components/InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Full name',
    placeholder: 'Enter your full name',
    helperText: 'This will be displayed on your profile',
    variant: 'outlined',
    size: 'md',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    password: true,
    showClear: true,
    helperText: 'Keep it secure',
    variant: 'filled',
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    invalid: true,
    errorMessage: 'Please enter a valid email',
    variant: 'outlined',
  },
};
