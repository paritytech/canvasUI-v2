import React, { useEffect, useState } from 'react';
import { KeyringPair, InstantiateAction } from '../../types';
import { createOptions } from '../../canvas';
import useDropdown from '../useDropdown';
import Input from '../Input';

interface Props {
  keyringPairs: Partial<KeyringPair>[];
  dispatch: React.Dispatch<InstantiateAction>;
  contractName: string;
  currentStep: number;
}

const Step2 = ({ dispatch, currentStep, keyringPairs, contractName }: Props) => {
  const [accountSelected, AccountDropdown, setAccountSelected] = useDropdown();
  const [name, setName] = useState('');
  useEffect(() => {
    keyringPairs && setAccountSelected(createOptions(keyringPairs, 'pair')[0]);
  }, []);
  useEffect(() => {
    setName(contractName);
  }, [contractName]);

  if (currentStep !== 2) return null;

  return keyringPairs ? (
    <>
      <label htmlFor="account" className="inline-block mb-2">
        Account
      </label>
      <AccountDropdown
        options={createOptions(keyringPairs, 'pair')}
        placeholder="No accounts found"
        className="mb-4"
      />
      <label htmlFor="account" className="inline-block mb-2">
        Contract name
      </label>
      <Input
        value={name}
        handleChange={e => setName(e.target.value)}
        placeholder="contract name"
        id={name}
      />

      <button
        type="button"
        className="bg-gray-500 mr-4  text-white font-bold py-2 px-4 rounded mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!accountSelected}
        onClick={() =>
          dispatch({
            type: 'STEP_2_COMPLETE',
            payload: {
              fromAddress: accountSelected.value.toString(),
              fromAccountName: accountSelected.name.toString(),
              contractName: name,
            },
          })
        }
      >
        Next
      </button>
      <button
        type="button"
        className="bg-gray-500 mr-4  text-white font-bold py-2 px-4 rounded mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() =>
          dispatch({
            type: 'GO_TO',
            payload: { step: 1 },
          })
        }
      >
        Go Back
      </button>
    </>
  ) : null;
};

export default Step2;