import React from 'react';
import { encodeTypeDef } from '@polkadot/types/create';
import { DatabaseIcon } from '@heroicons/react/outline';
import { ArgSignature } from './ArgSignature';
import type { AbiMessage } from 'types';
import { useCanvas } from 'ui/contexts/CanvasContext';
import { classes } from 'ui/util';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  message: Partial<AbiMessage>;
  params?: unknown[];
}

export function MessageSignature({
  className,
  message: { args, isConstructor, isMutating, method, returnType },
  params = [],
}: Props) {
  const { api } = useCanvas();

  return (
    <div className={classes('font-mono', isConstructor && 'constructor', className)}>
      <span className={isConstructor ? 'dark:text-blue-400' : 'dark:text-yellow-400'}>
        {method}
      </span>
      (
      {args?.map((arg, index): React.ReactNode => {
        return (
          <ArgSignature
            arg={arg}
            key={`${name}-args-${index}`}
            value={params[index] ? (params[index] as string) : undefined}
          >
            {index < args.length - 1 && ', '}
          </ArgSignature>
        );
      })}
      )
      {!isConstructor && returnType && (
        <>
          : <span>{encodeTypeDef(api.registry, returnType)}</span>
        </>
      )}
      {isMutating && (
        <>
          <DatabaseIcon className="inline-block ml-2 w-4 h-4 text-yellow-400" />
        </>
      )}
    </div>
  );
}
