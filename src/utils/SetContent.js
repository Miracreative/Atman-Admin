import { jsx as _jsx } from "react/jsx-runtime";
import Spinner from '../components/Spinner/Spinner';
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
const SetContent = ({ process, component }) => {
    switch (process) {
        case 'waiting':
            return _jsx(Spinner, { active: true });
        case 'loading':
            return _jsx(Spinner, { active: true });
        case 'confirmed':
            return _jsx(ErrorBoundary, { children: component });
        case 'error':
            return _jsx(ErrorMessage, {});
        default:
            throw new Error('Unexpected process state');
    }
};
export default SetContent;
