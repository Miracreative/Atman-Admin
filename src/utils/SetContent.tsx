import Spinner from '../components/Spinner/Spinner';
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
const SetContent = ({process, component} : {
    process: string,
    component: React.ReactNode
}) => {
  switch(process) {
    case 'waiting':
      return <Spinner active/>;
    case 'loading':
      return <Spinner active/>;
    case 'confirmed':
      return <ErrorBoundary>{component}</ErrorBoundary>;
    case 'error':
      return <ErrorMessage/>;
    default:
      throw new Error('Unexpected process state');
  }
}

export default SetContent