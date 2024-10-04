import { Component, ErrorInfo, ReactNode } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface ErrorBoundaryProps {
    children: ReactNode;
  }
  
  interface ErrorBoundaryState {
    hasError: boolean;
  }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
      }
    
      static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
      }
    
      componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
      }
    

  render(): ReactNode {
    if (this.state.hasError) {
        return (
          <>
            <ErrorMessage />
          </>
        );
      }
  
      return this.props.children;
    }
}

export default ErrorBoundary;