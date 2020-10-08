import React, { useState } from 'react';
import './Login.css';

const Login = () => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    function handleChange(name, value) {
        if (name === 'usuario') {
            setUser(value)
        }
        else {
            if (value.length < 6) {
                setPasswordError(true);
            }
            else {
                setPasswordError(false);
                setPassword(value)
            }
        }
    };

    function handleSubmit(params) {
        let account = { user, password }

        if (account) {
            console.log('account:', account)
        }
    };

    return (
        <div className='login-container'>
            <label>Registrarse</label>
            <label>Usuario</label>
            <input
                id='usuario'
                name='usuario'
                placeholder='Ingrese su usuario'
                type='text'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='regular-style'
            />
            <label>Contraseña</label>
            <input
                id='contraseña'
                name='contraseña'
                placeholder='Ingrese su contraseña'
                type='password'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='input-error'
            />
            {
                passwordError &&
                <label className='label-error'>
                    contraseña invalida o incompleta
                </label>
            }
            <button onClick={(e) => handleSubmit()}>
                Registrarse
             </button>
        </div>
    )
}

export default Login;