import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './_confirm.scss';
const ConfirmModal = ({ question, text1, text2, showConfirm, setShowConfirm, actionConfirmed }) => {
    return (_jsx("div", { className: `confirm ${showConfirm ? 'show' : ''}`, children: _jsxs("div", { className: 'confirm__modal', children: [_jsx("h3", { children: question }), _jsx("span", { children: text1 }), _jsx("span", { children: text2 }), _jsxs("div", { className: 'confirm__buttons', children: [_jsx("button", { className: 'button confirm__delete', onClick: () => actionConfirmed(), children: "Delete" }), _jsx("button", { className: 'button confirm__cancel', onClick: () => setShowConfirm(false), children: "Cancel" })] })] }) }));
};
export default ConfirmModal;
