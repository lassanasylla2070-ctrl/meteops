import { ErrorBoundary } from '@components/Errors/ErrorBoundary';
import React, { FC } from 'react';
import { App } from './App';

export const AppContainer: FC = () => {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
};
