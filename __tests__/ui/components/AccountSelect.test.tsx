import React from 'react';
import { jest } from '@jest/globals';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AccountSelect } from 'ui/components/AccountSelect';
import { DropdownProps, OrNull } from 'types';
import { mockKeyring, render } from 'test-utils';
import { truncate } from 'ui/util';

function mockProps(
  overrides: Partial<DropdownProps<OrNull<string>>> = {}
): DropdownProps<OrNull<string>> {
  const value = mockKeyring.getAccounts()[0].address;

  return {
    onChange: jest.fn(),
    value,
    ...overrides,
  };
}

describe('AccountSelect', () => {
  test('correctly renders available account options', () => {
    const [{ getByTestId }] = render(<AccountSelect {...mockProps()} />);

    const dropdownBtn = getByTestId('dropdown-btn') as HTMLButtonElement;

    expect(dropdownBtn).toBeInTheDocument();

    fireEvent.click(dropdownBtn);

    mockKeyring.getAccounts().forEach(({ address, meta }, index) => {
      const li = getByTestId(`dropdown-option-${index}`);

      expect(li).toHaveTextContent(meta.name as string);
      expect(li).toHaveTextContent(truncate(address, 4));
    });
  });
});
