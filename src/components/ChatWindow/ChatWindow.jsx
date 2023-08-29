
import './ChatWindow.css';
 
import EmojiPicker from 'emoji-picker-react';

import SearchIcon from '@mui/material/Card';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';
import EmojiIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import CloseIcon from '@material-ui/icons/Close';
import MicrophoneIcon from '@material-ui/icons/Mic';

import { useState, useRef, useEffect } from 'react';
import { MessageItem } from '../MessageItem/MessageItem';
import { ChatModal } from '../ChatModal/ChatModal';
import { API } from '../../API';

export const ChatWindow = ( { chatInfo, user } ) => {
    const chatBody = useRef();

    const [ emojiBarToggle, setEmojiBarToggle ] = useState(false);
    const [ message, setMessage ] = useState("");
    const [ listening, setListening ] = useState(false);
    const [ messageList, setMessageList ] = useState([]);
    const [ sent, setSent ] = useState(false);
    const [ toggleChatModel, setToggleChatModal ] = useState(false);

    useEffect( ( ) => {
        if (chatBody.current.scrollHeight > chatBody.current.clientHeight) {
            chatBody.current.scrollTo(0, chatBody.current.scrollHeight - chatBody.current.clientHeight);
        }
    }, [ messageList ]);

    const toggleEmojiBar = ( ) => {
        setEmojiBarToggle(!emojiBarToggle);
    }

    useEffect(() => {
        console.log(messageList.length);
    })

    const handleMicrophoneClick = ( ) => {
        if (!listening) {
            setListening(true);
        } else {
            setListening(false);
        }
    }

    const handleMessageChange = ( e ) => {
        setMessage(e.target.value);
    }

    const handleSendClick = ( ) => {
        setEmojiBarToggle(false);
        setSent(true);

        if (message !== "") {
            let newMessage = {
                uid: `${Math.random() * 10}`,
                author: user.uid,
                content: message, 
                type: "text"
            }
            API.updateMessageList( chatInfo, newMessage )
            setMessage("");
        }
    }

    const handleMoreClick = ( ) => {
        setToggleChatModal(!toggleChatModel);
    }

    useEffect( ( ) => {
        API.getMessageList( chatInfo, setMessageList );
    }, [ sent ]);

    return (
        <div className='chat-window--container' >
            <div className='chat-window-inner--container'>
                { toggleChatModel &&
                    <ChatModal onCloseChatClick={ () => setMessageList([]) } />
                }
                <header className='chat-window-header' >
                    <div className='chat-window-info--container'>
                        <div className='chat-window-avatar--container'>
                            <img src={ chatInfo?.image } className='chat-avatar' />
                        </div>
                        <div className='chat-window-name--container'>
                            <p className='chat-window-name'>{ chatInfo?.title }</p>
                        </div>
                    </div>
                    <div className='chat-window-buttons--container'>

                        <div className='chat-window-button'>
                            <SearchIcon className='chat-window-icon' />
                        </div>
                        <div className='chat-window-button'>
                            <AttachFileIcon className='chat-window-icon' />
                        </div>
                        <div className='chat-window-button' onClick={ handleMoreClick } >
                            <MoreVertIcon className='chat-window-icon' />
                        </div>
                    </div>
                </header>
                <div className='chat-window-body' ref={ chatBody }>
                    { messageList &&
                        messageList.map( (item, key) => (
                            <MessageItem 
                                data={ item } 
                                user={ user }
                                id={`${key}`} />
                        ))
                    }
                </div>

                <div className={`chat-window-emoji--container ${emojiBarToggle ? "active" : ""}`}>
                    <EmojiPicker 
                        onEmojiClick={ (e) => setMessage( message + e?.emoji ) }
                        skinTonesDisabled 
                        searchDisabled 
                        height={`${ emojiBarToggle ? "100%" : "0"}`}
                        width={"100%"}/>
                </div>

                <footer className="chat-window-footer">
                    <div className='chat-window-footer--container'>
                        <div className='chat-window-footer-left--container'>
                            <div className={`${ !emojiBarToggle ? "chat-window-button--hidden " : "chat-window-button" }`} 
                                onClick={ () => setEmojiBarToggle(false) }>
                                <CloseIcon className={`chat-window-icon`} 
                                        style={{ width: emojiBarToggle ? 20 : 0 }} />
                            </div>
                            <div className='chat-window-button' onClick={ toggleEmojiBar }>
                                <EmojiIcon className='chat-window-icon' />
                            </div>
                        </div>
                        <div className='chat-window-footer-central--container'>
                            <div className='chat-window-input--container'>
                                <input type='text' 
                                       placeholder='Type a message here...' 
                                       className='chat-window-input'
                                       value={ message }
                                       onChange={ handleMessageChange } />
                            </div>
                        </div>
                        <div className='chat-window-footer-right--container'>
                            { message === "" &&
                                <div className='chat-window-button' onClick={ handleMicrophoneClick }>
                                    <MicrophoneIcon className={`chat-window-icon`} style={{ color: listening ? "blue" : ""}} />
                                </div>
                            }
                            <div className='chat-window-button' onClick={ handleSendClick }>
                                <SendIcon className='chat-window-icon' />
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
