import './_spinner.scss'

const Spinner = ({active} : {
    active: boolean,
}) => {
    return (
        <div className={active ? 'spinner active' : 'spinner'}>
            <span className="loader"></span>
        </div>
    )
};

export default Spinner;