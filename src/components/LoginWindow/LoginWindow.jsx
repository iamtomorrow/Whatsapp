
import Logo from "../../../public/images/logo.png";
import './LoginWindow.css';
// import FacebookIcon from "@material-ui/icons/Facebook";
import GithubIcon from "remixicon-react/GithubFillIcon";
import GoogleIcon from "remixicon-react/GoogleFillIcon";

import { API } from "../../API";

export const LoginWindow = ( ) => {
    const handleGoogleLogin = async ( ) => {
        await API.getGoogleAuth();
    }

    const handleGithubLogin = async ( ) => {
        await API.getGithubAuth();
    }

    return (
        <div className='login-window--container'>
            <div className='login-window-header--container'>
                <img src={ Logo } className="login-window-logo" />
                {/* <h1 className='header-line-1 login-window-header-h1'>Stay always connected</h1> */}
            </div>
            <div className="login-window-body--container">  
                <div className='login-card--container' onClick={ handleGoogleLogin }>
                    <GoogleIcon  className='login-card-icon' /> 
                    <p className="login-card-p">Connect with Google</p>
                </div>
                <div className='login-card--container' onClick={ handleGithubLogin }>
                    <GithubIcon className="login-card-icon" />
                    <p className="login-card-p">Connect with Github</p>
                </div>
                {/* <div className='login-card--container'>
                    <FacebookIcon className="login-card-icon" />
                    <p className="login-card-p">Connect with Facebook</p>
                </div> */}
            </div>
        </div>
    )
}
