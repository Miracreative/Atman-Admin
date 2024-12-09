import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './_modalAlert.scss';
const ModalAlert = ({ showAlert, setShowAlert, message, alertConfirm = () => { }, }) => {
    return (_jsx("div", { className: `alert ${showAlert ? 'show' : ''}`, children: _jsxs("div", { className: "alert__inner", children: [_jsx("div", { className: "alert__subtitle", children: message }), _jsx("div", { className: "alert__btns", children: _jsx("button", { className: "alert__cancel button ", onClick: () => { setShowAlert(false); alertConfirm(); }, children: "Ok" }) })] }) }));
};
export default ModalAlert;
