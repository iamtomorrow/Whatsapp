
import BannerImage from '../../../public/images/backgrounds/banner-image.png';
import './ChatIntro.css';

export const ChatIntro  = () => {

    return (
        <div className="chatintro--container">
            <div className='chatintro-content--container'>
                <img src={ BannerImage } id='banner-image' />
                <h1 className='head-line-1'>Whatsapp for Desktop</h1>
                <h3 className='head-line-3'>Make calls and send messages without disconnecting your phone. <br/>
                    Use Whatsapp on up to 4 devices at the same time</h3>
            </div>
            <div className='chatintro-border-line'></div>
        </div>
    )
}
