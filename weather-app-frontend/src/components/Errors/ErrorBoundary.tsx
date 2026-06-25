import { captureError } from '@errors/utils/capture-error';
import React, { Component } from 'react';
import { Error500 } from './Error500/Error500';

interface Props {
  children: any;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: any) {
    captureError(error, info);
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <Error500 />;
    }

    return children;
  }
}
