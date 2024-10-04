import PanelHeader from '../../components/PanelHeader/PanelHeader'

export default function AdminPanel() {
  const {name} = JSON.parse(window.sessionStorage.getItem('admin') || '""')
  return (
    <PanelHeader title={`Добро пожаловать ${name ? name : 'в административную панель'}`} children={null} showBackBtn={false}/>
  )
}