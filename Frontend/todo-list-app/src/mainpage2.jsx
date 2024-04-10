import './main-page2.css';
import addbuttonImg from './images/addbutton.png';
import logoutbuttonImg from './images/logoutbutton.png';


function MainPage2(){
    return(
        
        <>
       <div style={{display: 'flex', marginLeft:'91%'}}>
       <a href='/login' id='login' style={{textDecoration:'none'}}><p className='topBarFont'>Login</p> </a>
       <a href='./sign-up' id='signup' style={{marginLeft:'20px'}}><p className='topBarFont'>Sign Up</p></a>
        </div>
        
        <div className='topLine'></div>

        <div style={{display: 'flex', marginTop: '5%', marginBottom: '3vh'}}>
        <textarea className='addNoteBox' style={{ overflow: 'hidden' ,resize: 'none',border: '1px solid gray', color: '#A3A1A1', fontFamily: 'Inter , sans-serif', fontSize: '22px', paddingLeft: '10px', paddingTop:'20px' }}>+ Add a note here</textarea>
        <button id='logout' style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}><img src={addbuttonImg} alt='AddButton' style={{height:'40px', width: '40px', marginLeft: '2vh',marginTop:'4px', borderRadius: '50%', boxShadow: '0 4px 5px rgba(0, 0, 0, 0.25)', userSelect: 'none'}}>
        </img></button>
        </div>

        <div className='NotesPart'/>
        </>
        
    );
}

export default MainPage2;