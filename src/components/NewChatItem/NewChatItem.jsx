
import './NewChatItem.css';

export const NewChatItem = ( { chatUser, handleAddNewChatClick } ) => {
    return (
        <>
            <div className={`new-chat-item--container`} key={ chatUser.uid } onClick={ handleAddNewChatClick }>
                <div className="item-left--container">
                    <div className="item-user-avatar">
                        <img className='new-chat-item-photoURL' src={ chatUser.photoURL  } />
                    </div>
                </div>
                <div className="item-central--container">
                    <p className="new-chat-name">{ chatUser.name }</p>
                </div>
                <div className="item-right--container">

                </div>
            </div>
            <div className="item-border-bottom"></div>
        </>
    )
}
