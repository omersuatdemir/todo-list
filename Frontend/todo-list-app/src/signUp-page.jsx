import './signUp-page.css'
import loginButtonImg from './images/loginbutton.png';
import googleIcon from './images/googleicon.png';


function SignUpPage() {
    return (
        <>
        <div className='signupPart'>
        <h1 className='Header'>Sign Up</h1>

        
        <div className='loginInputBox1'><p style={{marginTop: '7px', marginLeft: '7px', userSelect: 'all'}}>E-mail</p></div>
        <div className='loginInputBox2'><p style={{marginTop: '7px', marginLeft: '7px', userSelect: 'all'}}>Password</p></div> 
        <div className='loginInputBox3'><p style={{marginTop: '7px', marginLeft: '7px', userSelect: 'all'}}>Password(Again)</p></div> 
        

        <a href="/login" id='login'><img src={loginButtonImg} alt='Login Button' style={{display: 'inline-block',boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.25)' , width: '35px', height: '35px', marginTop: '10px', marginLeft: '74%'}}></img></a>

        <div style={{ display: 'flex', height: '50px' }}>
        <div className='grayLines'></div>
        <p className='orText'>OR</p>
        <div className='grayLines' style={{marginLeft: '10px'}}></div>
        </div>

        <a href='/google' id='login-w-google'><img src={googleIcon} alt='Google Login Button' style={{display: 'inline-block',boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)' ,marginLeft: '45.5%', width: '28px', height: '30px' }}></img></a>
        
        <div style = {{display: 'flex' , justifyContent: 'center', height: '40px'}}>
        <p className='signUpText' style={{color: '#6C6767'}}>Already have an account?</p> 
        <a href="/sign-up" id='sign-up' className='signUpText' style={{ marginLeft: '10px', color: '#612566', textDecoration: 'none' }}>Login</a>
         </div>

        </div>
        </>

    );
}

export default SignUpPage;