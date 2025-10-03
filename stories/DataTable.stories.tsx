import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '../src/components/DataTable';

type Row = { id: number; name: string; age: number; city?: string };

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable as any,
};

export default meta;

const sampleData: Row[] = [
  { id: 1, name: 'Alice', age: 26, city: 'Berlin' },
  { id: 2, name: 'Bob', age: 34, city: 'Paris' },
  { id: 3, name: 'Charlie', age: 29, city: 'Delhi' },
];

export const Default: StoryObj<any> = {
  args: {
    data: sampleData,
    columns: [
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
      { key: 'city', title: 'City', dataIndex: 'city' },
    ],
    selectable: true,
  },
};

export const Loading: StoryObj<any> = {
  args: {
    data: [],
    columns: [
      { key: 'name', title: 'Name', dataIndex: 'name' }
    ],
    loading: true,
  },
};
