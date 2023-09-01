
import { useEffect, useState } from "react";
import "./ChatlistItem.css";

export const ChatlistItem = ( { id, image, name, last_msg, last_time, active, onItemClick } ) => {

    const [ lastTime , setLastTime ] = useState();

    const convertTime = ( ) => {
        let date = new Date(last_time * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        setLastTime(hours + ":" + minutes.substring(1, 3));
    }

    useEffect(() => {
        convertTime();
    }, []);

    return (
        <>
            <div className={`chatlist-item--container ${ active ? "active" : ""} `} key={ `${id}` } onClick={ onItemClick }>
                <div className="item-left--container">
                    <div className="item-user-avatar">
                        <img src={ image } className="chat-avatar" />
                    </div>
                </div>
                <div className="item-central--container">
                    <p className="chatlist-name">{ name }</p>
                    <p className="chatlist-lastmsg">{ last_msg.length > 34 ? last_msg.substring(0, 34) + "..." : last_msg}</p>
                </div>
                <div className="item-right--container">
                    <p className="chatlist-lasttime">{ lastTime }</p>
                </div>
            </div>
            <div className="item-border-bottom"></div>
        </>
    )
}
