
import "./ChatlistItem.css";

export const ChatlistItem = ( { id, image, name, last_msg, last_time, active, onItemClick } ) => {
    return (
        <>
            <div className={`chatlist-item--container ${active ? "active" : ""} `}  onClick={ onItemClick }>
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
                    <p className="chatlist-lasttime">{ }</p>
                </div>
            </div>
            <div className="item-border-bottom"></div>
        </>
    )
}
