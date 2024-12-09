import { jsx as _jsx } from "react/jsx-runtime";
import PanelHeader from '../../components/PanelHeader/PanelHeader';
export default function AdminPanel() {
    const { name } = JSON.parse(window.sessionStorage.getItem('admin') || '""');
    return (_jsx(PanelHeader, { title: `Добро пожаловать ${name ? name : 'в административную панель'}`, children: null, showBackBtn: false }));
}
