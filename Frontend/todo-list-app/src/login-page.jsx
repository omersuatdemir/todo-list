import './login-page.css';
import loginButtonImg from './images/loginbutton.png';
import googleIcon from './images/googleicon.png';
import { Link } from 'react-router-dom';

function LoginPage() {
    return (
      <div className='loginPart'>

        <h1 className='Header'>Login</h1>

        <div className='loginInputBox1'><p style={{marginTop: '7px', marginLeft: '7px', userSelect: 'all'}}>E-mail</p></div>
        <div className='loginInputBox2'><p style={{marginTop: '7px', marginLeft: '7px', userSelect: 'all'}}>Password</p></div> 

        <div style={{display: 'flex'}}>
        <a href='/forgotpassword' id='forgotpassword'><p style={{display:"inline-block", marginLeft: '180px', fontFamily: 'chenla', fontSize: '14px', color: '#6C6775'}}>Forgot your password?</p></a>
        <a href="/user" id='login'><img src={loginButtonImg} alt='Login Button' style={{display: 'inline-block',borderRadius: '50%', boxShadow: '0 4px 5px rgba(0, 0, 0, 0.25)',marginTop: '15px' ,marginLeft: '5px', width: '35px', height: '35px' }}></img></a>
        </div> 

        <div style={{ display: 'flex', height: '50px' ,paddingTop: '0px'}}>
        <div className='grayLines'></div>
        <p className='orText'>OR</p>
        <div className='grayLines' style={{marginLeft: '10px'}}></div>
        </div>

        <a href='/google' id='login-w-google'><img src={googleIcon} alt='Google Login Button' style={{display: 'inline-block',boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)' ,marginLeft: '196px', width: '28px', height: '30px' }}></img></a>
        
        <div style = {{display: 'flex' , justifyContent: 'center', height: '40px'}}>
        <p className='signUpText' style={{color: '#6C6767'}}>You don't have an account?</p> 
        <Link to="/sign-up" id='sign-up' className='signUpText' style={{ marginLeft: '10px', color: '#612566', textDecoration: 'none' }}>Sign Up</Link>
         </div>
  
     </div>
 );
}

export default LoginPage;