
import "./App.css";
import Logo from '../public/images/logo.png';
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVert from "@material-ui/icons/MoreVert";
import Search from "@material-ui/icons/Search";

import { ChatlistItem } from "./components/ChatlistItem/ChatlistItem";

import { useEffect, useState } from "react";
import { ChatIntro } from "./components/ChatIntro/ChatIntro";
import { ChatWindow } from "./components/ChatWindow/ChatWindow";
import { NewChatWindow } from "./components/NewChatWindow/NewChatWindow";
import { LoginWindow } from "./components/LoginWindow/LoginWindow";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./Auth/firebase";
import { API } from "./API";

export const App = () => {
  const [ chats, setChats ] = useState([]);
  const [ backChats, setBackChats ] = useState();
  const [ toggleNewChat, setToggleNewChat ] = useState( false );
  const [ chatActive, setChatActive ] = useState( false );
  const [ currentChat, setCurrentChat ] = useState();
  const [ user, setUser ] = useAuthState( auth );
  const [ search, setSearch ] = useState("");

  const handleChatClick = (id, item) => {
    setChatActive( id );
    setCurrentChat( item );
  }

  const handleNewChatClick = ( ) => {
    setToggleNewChat( !toggleNewChat );
  }

  useEffect(() => {
    if (search === "") {
      setChats(backChats);
    } else {
      setChats(prev => prev.filter((d) => { 
        let reg = new RegExp(`${search}`, "gi");
        console.log(d.title.match(reg))
        if (d.title.match(reg) !== null ) {
          return d
        }
        }));
    }
  }, [ search ])

  useEffect( () => {
    const getChats = async ( ) => {
      if (user !== undefined && user !== null) {
        await API.getActiveChats( user.uid, setChats );
        setBackChats(chats);
      } else {
        return ( <LoginWindow /> )
      }
    }
    getChats();
  }, [ user ]);

  return (
    <div className='container'>
      <NewChatWindow 
        user={ user }
        setToggle={ setToggleNewChat } 
        toggle={ toggleNewChat } 
      /> 

      <div className="left--container">
        <div className="left-inner--container">
          <div className="left-top--container">
            <header className="left-header--container">
              <div className="logo--container">
                <img src={ Logo } id="header-logo" />
              </div>
            </header>

            <div className="buttons--container">
              <div className="user-info--container">
                <div className="header-user-avatar">
                  <img src={ user?.photoURL ? user?.photoURL : "" } className="avatar-image" />
                </div>
                <p className="header-user-name">{ user?.displayName ? user.displayName : "" }</p>
              </div>
              <div className="nav-buttons--container">
                <div className="nav-button">
                  <DonutLargeIcon className="nav-icon" />
                </div>
                <div className="nav-button" onClick={ handleNewChatClick }>
                  <ChatIcon className="nav-icon" />
                </div>
                <div className="nav-button">
                  <MoreVert className="nav-icon" />
                </div>
              </div>
            </div>

            <div className="search-bar--container">
              <div className="search-input--container">
                <div className="search-icon--container">
                  <Search id="search-icon" />
                </div>
                <input type="search" 
                      placeholder="Search for contacts" 
                      className="search-input"
                      value={ search }
                      onChange={ e => setSearch(e.target.value) } />
              </div>
            </div>
          </div>
          
          <div className="left-center--container">
            <div className="chatlist--container">
              { chats &&
                  chats.map(item => (
                    <ChatlistItem 
                      image={ item.image }
                      id={ item?.chat_id }
                      name={ item?.title } 
                      last_msg={ item.last_msg } 
                      last_time={ item.last_time }
                      active={ item.id === chatActive ? true : false }
                      onItemClick={ () => handleChatClick( item?.chat_id, item ) } 
                    />
                  ))
              }
            </div>
          </div>

          <div className="left-bottom--container">
              
          </div>
        </div>
      </div>
      <div className="right--container">
        <div className="right-inner--container">
          { chatActive === false &&
              <ChatIntro />
          }
          { chatActive !== false &&
              <ChatWindow chatInfo={ currentChat } user={ user } />
          }
        </div>
      </div>
    </div>
  )
}
