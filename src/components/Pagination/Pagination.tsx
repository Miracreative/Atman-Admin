import "./_pagination.scss";

const Pagination = ({currentPage, totalPages, changePage, setFlag}: {
    currentPage: number,
    totalPages: number,
    changePage: (step: any) => void, 
    setFlag: (state: any) => void,
}) => {
  

  if ( totalPages === null || +totalPages <= 1 || totalPages === undefined) {
    return null
  }
  return (
    <div className="pagination">
        <button type="button" disabled={currentPage <= 1 ? true : false} onClick={() => {changePage(-1); setFlag((state: boolean) => !state)}}>
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 9C21.5523 9 22 8.55228 22 8C22 7.44772 21.5523 7 21 7L21 9ZM0.292893 7.29289C-0.0976314 7.68342 -0.0976315 8.31658 0.292892 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538407 7.04738 0.538407 6.65686 0.928931L0.292893 7.29289ZM21 7L1 7L1 9L21 9L21 7Z" fill="white"/>
        </svg>
        </button>
        <p className="pagination__pages">{currentPage}/{totalPages}</p>
        <button type="button" disabled={currentPage >= totalPages ? true : false} onClick={() => {changePage(+1); setFlag((state: any) => !state)}}>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7C0.447715 7 9.65645e-08 7.44772 0 8C-9.65645e-08 8.55228 0.447715 9 1 9L1 7ZM21.7071 8.70711C22.0976 8.31659 22.0976 7.68342 21.7071 7.2929L15.3431 0.928935C14.9526 0.53841 14.3195 0.53841 13.9289 0.928934C13.5384 1.31946 13.5384 1.95262 13.9289 2.34315L19.5858 8L13.9289 13.6569C13.5384 14.0474 13.5384 14.6805 13.9289 15.0711C14.3195 15.4616 14.9526 15.4616 15.3431 15.0711L21.7071 8.70711ZM1 9L21 9L21 7L1 7L1 9Z" fill="white"/>
          </svg>
        </button>
      </div>
  )
}

export default Pagination