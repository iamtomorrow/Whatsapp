
import ArrowBack from '@material-ui/icons/ArrowBack';
import "./NewChatWindow.css";
import { useEffect, useState } from 'react';
import { API } from "../../API";
import { NewChatItem } from '../NewChatItem/NewChatItem';

export const NewChatWindow = ( { user, toggle, setToggle } ) => {
    const [ chatList, setChatList ] = useState();

    useEffect(() => {
        const getChatList = async ( ) => {
            let data = await API.getChats( user.uid );
            if (data) {
                setChatList( data );
            }
        }
        if (user !== undefined && user !== null) {
            getChatList();
        }
    }, [ user ]);

    const addNewChat = async ( user2 ) => {
        setToggle(false)
        await API.addNewChat( user, user2 );
    }

    return (
        <div className={`new-chat-window--container ${ !toggle ? "new-chat-window--container--inactive" : ""}`}>
            <div className="new-chat-window-inner--container">
                <div className='new-chat-window-header--container'>
                    <div className="chat-window-button" onClick={ () => setToggle(false) }>
                        <ArrowBack className='chat-window-icon' />
                    </div>
                    <p className='new-chat-window-title'>New chat</p>
                </div>
                <div className='new-chat-window-body--container'>
                    <div className='chat-list--container'>
                        { chatList &&
                            chatList.map((item, key) => (
                                <NewChatItem chatUser={ item } key={ key } handleAddNewChatClick={ () => addNewChat(item) } />
                            ))
                        }          
                    </div>
                </div>
            </div>
        </div>
    )
}
