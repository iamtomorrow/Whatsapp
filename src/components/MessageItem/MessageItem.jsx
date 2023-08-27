
import './MessageItem.css';
import { useState, useEffect } from 'react';

export const MessageItem = ( { data, user, id } ) => {

    const [ date , setDate ] = useState();

    const convertTime = ( ) => {
        let date = new Date(data.date * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        setDate(hours + ":" + minutes.substring(1, 3));
    }

    useEffect(() => {
        convertTime();
    }, []);

    return (
        <div className="message-item--container" 
            id={ `${data.uid}` }
            style={{ justifyContent: user.uid === data.author ? "flex-end" : "flex-start"}}>
            <div className='message-item-inner--container'
                style={{ backgroundColor: user.uid === data.author ? "var(--surface-variant-color)" : "var(--surface-color)"}}>
                <p className='message-item-content'> { data.content }</p>
                <p className='message-item-date'>{ `${ date }` }</p>
            </div>
        </div>
    )
} 
