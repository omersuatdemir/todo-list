import SignUpPage from './signUp-page.jsx';
import LoginPage from './login-page.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return(
<>
<BrowserRouter>
<Routes>
    <Route path='/' element = {<LoginPage/>}></Route>
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