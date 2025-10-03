import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '../src/components/InputField';
import { describe, it, expect, vi } from 'vitest';

describe('InputField', () => {
  it('renders label and placeholder', () => {
    render(<InputField label="Name" placeholder="Enter" />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('calls onChange', () => {
    const onChange = vi.fn();
    render(<InputField label="Name" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'A' } });
    expect(onChange).toHaveBeenCalled();
  });
});
