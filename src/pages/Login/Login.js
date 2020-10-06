import React, {userState, useState} from 'react';
import './Login.css';
import Title from './Components/Title/Title';
import Label from './Components/Label/Label';
import Input from './Components/Input/Input';


const Login = () => {

    const [user, setUser]= useState('');
    const [password, setPassword]= useState('');
    const [passwordError, setPasswordError]= useState(false);

    function handleChange(name,value) {
        if(name === 'usuario'){
            setUser(value)
        }
        else{
            if(value.length < 6)
            {
                setPasswordError(true);
            }
            else{
                setPasswordError(false);
                setPassword(value)
            }
        }
    };

    function handleSubmit(params) {
        let account= {user,password}

        if(account)
        {
            console.log('account:', account)
        }
    };
    return(
        <div className= 'login-container'>
            <Title text= 'Registrarse'/>
            <Label text= 'Usuario'/>
            <Input 
             attribute={{
                 id: 'usuario',
                 name: 'usuario',
                 placeholder: 'Ingrese su usuario',
                 type: 'text'  
             }}
             handleChange={handleChange}
             />
            <Label text= 'Contraseña'/>
            <Input 
             attribute={{
                 id: 'contraseña',
                 name: 'contraseña',
                 placeholder: 'Ingrese su contraseña',
                 type: 'password'  
             }}
             handleChange={handleChange}
             param={passwordError}
             />
             { passwordError &&
             <label className='label-error'>
                 contraseña invalida o incompleta
             </label>}
             <button onClick={handleSubmit}>
                 Registrarse
             </button>
        </div>
    )
}

export default Login;