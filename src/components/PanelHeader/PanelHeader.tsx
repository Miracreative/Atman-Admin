import { useNavigate } from 'react-router';
import './_panelHeader.scss'
const PanelHeader = ({title, children, showBackBtn} : {
    title: string,
    children: string | null,
    showBackBtn: boolean
}) => {
  const navigate = useNavigate();
  const backBtn = (
    <button className="square-btn square-btn--back" onClick={() => navigate(-1)}></button>
  )
  return (
    <div className="panelhead">
      {showBackBtn ? backBtn : null}
      <h1 className="panelhead__title">{title}</h1>
      {children}
    </div>
  );
};



export default PanelHeader;