import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router';
import './_panelHeader.scss';
const PanelHeader = ({ title, children, showBackBtn }) => {
    const navigate = useNavigate();
    const backBtn = (_jsx("button", { className: "square-btn square-btn--back", onClick: () => navigate(-1) }));
    return (_jsxs("div", { className: "panelhead", children: [showBackBtn ? backBtn : null, _jsx("h1", { className: "panelhead__title", children: title }), children] }));
};
export default PanelHeader;
