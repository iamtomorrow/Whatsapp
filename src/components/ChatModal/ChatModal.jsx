
import './ChatModal.css';

export const ChatModal = ( { onCloseChatClick } ) => {

    const handleAboutUsClick = ( ) => {
        window.location.href = "https://github.com/iamtomorrow/Whatsapp-Clone"
    }

    return (
        <div className='chat-modal--container' >
            <div className='chat-modal-inner--container'>
                {/* <div className='chat-modal-option' onClick={ onCloseChatClick }>
                    <p>Close chat</p>
                </div> */}
                <div className='chat-modal-option' onClick={ handleAboutUsClick }>
                    <p>About us</p>
                </div>
                <div className='item-border-bottom'></div>
            </div>
        </div>
    )
}
