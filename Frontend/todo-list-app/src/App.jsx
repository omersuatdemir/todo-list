import SignUpPage from './signUp-page.jsx';
import LoginPage from './login-page.jsx';
import MainPage from './main-page.jsx';
import MainPage2 from './mainpage2.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return(
<>
<BrowserRouter>
<Routes>
    <Route path='/' element = {<MainPage2/>}></Route>
    <Route path='/user' element = {<MainPage/>}></Route>
    <Route path='/sign-up' element = {<SignUpPage/>}></Route>
    <Route path= '/login' element = {<LoginPage/>}></Route>
    <Route path='/google' element = {<login-w-google/>}></Route>
    <Route path='/forgotpassword' element = {<forgotpassword/>}></Route>

</Routes>
</BrowserRouter>
</>
    );
}

export default App;