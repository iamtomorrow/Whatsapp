
import './MessageItem.css';

export const MessageItem = ( { data, user, id } ) => {
    return (
        <div className="message-item--container" 
            key={ id }
            style={{ justifyContent: user.uid === data.author ? "flex-end" : "flex-start"}}>
            <div className='message-item-inner--container'
                style={{ backgroundColor: user.uid === data.author ? "var(--surface-variant-color)" : "var(--surface-color)"}}>
                <p className='message-item-content'> { data.content }</p>
                <p className='message-item-date'>{ `${ data.date }` }</p>
            </div>
        </div>
    )
} 
