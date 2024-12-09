import { jsx as _jsx } from "react/jsx-runtime";
import './_spinner.scss';
const Spinner = ({ active }) => {
    return (_jsx("div", { className: active ? 'spinner active' : 'spinner', children: _jsx("span", { className: "loader" }) }));
};
export default Spinner;
