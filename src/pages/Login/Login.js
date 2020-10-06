import React from 'react';
import './Login.css';
import Title from './Components/Title/Title';
import Label from './Components/Label/Label';
import Input from './Components/Input/Input';


const Login = () => {
    return(
        <div className= 'login-container'>
            <Title text= 'Registrarse'/>
            <Label text= 'Usuario'/>
            <Input />
            <Label text= 'Contraseña'/>
            <Input />
        </div>
    )
}

export default Login;