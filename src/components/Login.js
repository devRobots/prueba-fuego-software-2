import React from 'react';
import './Login.css';

export default class Login extends React.Component {

    state = {
        'user': '',
        'password': '',
        'passwordError': false
    }

    handleChange(name, value) {
        if (name === 'usuario') {
            this.setState('user', value);
        } else {
            if (value.length < 6) {
                this.setState('passwordError', true);
            } else {
                this.setState('passwordError', false);
                this.setState('password', value);
            }
        }
    };

    handleSubmit(params) {
        const user = this.state.user
        const password = this.state.password
        const account = { user, password }

        if (account) {
            console.log('account:', account)
        }
    };

    render() {
        return (
            <div className='login-container'>
                <label className='title-label'>Registrarse</label>
                <label>Usuario</label>
                <input
                    id="usuario"
                    name="usuario"
                    placeholder="Ingrese su usuario"
                    type="text"
                    onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                    className={'regular-style'}
                />
                <label>Contraseña</label>
                <input
                    id="contraseña"
                    name="contraseña"
                    placeholder="Ingrese su contraseña"
                    type="password"
                    onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                    className={'input-error'}
                />
                {
                    this.state.passwordError &&
                    <label className='label-error'>
                        Contraseña invalida o incompleta
                    </label>
                }
                <button onClick={this.handleSubmit}>
                    Registrarse
             </button>
            </div>
        )
    }
}