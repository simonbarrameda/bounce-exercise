export default function SideBar(props) {
    const { handleToggleModal, data } = props
    return (
        <div className='sidebar'>
            <div onClick={handleToggleModal} className='bgOverlay'></div>
            <div className='sidebarContents'>
                <button onClick={handleToggleModal}>
                    <i className='fa-solid fa-arrow-right'></i>
                </button>
                <h2>{data?.title}</h2>
                <div className='descriptionContainer'>
                    <p className='descriptionTitle'>{data?.date}</p>
                    <p>{data?.explanation}</p>
                </div>
            </div>
        </div>
    )
}