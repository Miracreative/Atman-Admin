import './_confirm.scss'
const ConfirmModal = ({question, text1, text2, showConfirm, setShowConfirm, actionConfirmed} : {
    question: string,
    text1: string,
    text2: string,
    showConfirm: boolean,
    setShowConfirm: (value: boolean) => void,
    actionConfirmed: () => void
    }) => {

    return (
       <div className={`confirm ${showConfirm ? 'show' : ''}`}>
            <div className='confirm__modal'>
                <h3>{question}</h3>
 
                <span>{text1}</span>
                <span>{text2}</span> 

                <div className='confirm__buttons'>
                    <button className='button confirm__delete' onClick={()=> actionConfirmed()}>
                        Delete
                    </button>
                    <button className='button confirm__cancel'  onClick={()=>setShowConfirm(false)}>
                        Cancel
                    </button>
                </div>
            </div>
       </div>
    )
}

export default ConfirmModal;