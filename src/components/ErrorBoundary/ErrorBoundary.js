import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Component } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(_) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (_jsx(_Fragment, { children: _jsx(ErrorMessage, {}) }));
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
