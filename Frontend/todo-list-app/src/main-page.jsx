import './main-page.css';
import addbuttonImg from './images/addbutton.png';
import logoutbuttonImg from './images/logoutbutton.png';

function MainPage(){
return(
<>
<a href='/' id='logout' style={{textDecoration:'none'}}><div style={{display: 'flex', marginLeft:'95%'}}>
<p className='topBarFont'>Logout</p>
<img src= {logoutbuttonImg} style={{width:'22px', height: '22px', marginTop:'15px', display:'inline-block'}}></img>
</div>
</a>
<div className='topLine'></div>

<div style={{display: 'flex', marginTop: '5%', marginBottom: '3vh'}}>
<div className='addNoteBox'><p style={{color: '#A3A1A1', fontFamily: 'Inter , sans-serif', fontSize: '20px',marginLeft:'10px'}}>+ Add a note here</p></div>
<button id='logout' style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}><img src={addbuttonImg} alt='AddButton' style={{height:'40px', width: '40px', marginLeft: '2vh',marginTop:'4px', borderRadius: '50%', boxShadow: '0 4px 5px rgba(0, 0, 0, 0.25)', userSelect: 'none'}}>
</img></button>
</div>

<div className='NotesPart'/>
</>
);

}

export default MainPage;