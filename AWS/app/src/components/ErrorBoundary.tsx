//ErrorBoundary.tsx
import React, { Component, ErrorInfo } from 'react';
import '../styles/Error.css'

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div id='error-boundary'>
        <h1>Cannot Connect to the Server</h1>
        <h3>Make sure you are connected to the LASP VPN</h3>
        <h4>Secure Scoket Layer not yet configured. Open a new tab and enter 'https://10.247.28.237:3000'. Click Advanced, and choose to proceed. This issue is temporary. </h4>
        </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
