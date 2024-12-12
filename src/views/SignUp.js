import axios from 'axios';
import './SignUp.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const SignUp = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordRepeated: ''
    });
    const [loginMessage, setLoginMessage] = useState([]);
    const [rerouteAfterSuccess, setRerouteAfterSuccess] = useState(false)

    const [errorMessage, setErrorMessage] = useState([]);
    const [possibleToSubmit, setPossibleToSubmit] = useState(true);
    const regExUsername = /^[^\s]*$/;
    const regExEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const regExSpecialChar = /[!#@$%]+/;
    const regExNumber = /[0-9]+/;

    const updateFormData = (e) => {

        let fieldName = e.target.name;

        setFormData((prevForm) => {
            return { ...prevForm, [fieldName]: e.target.value }
        })
    }

    const submitData = (e) => {
        e.preventDefault();
        setErrorMessage([]);
        setPossibleToSubmit(true);

        if (formData.username.length < 4) {
            setPossibleToSubmit(false);
            setErrorMessage((prevMessage) => {
                return prevMessage.concat('Nazwa użytkownika musi składać się z przynajmniej 4 znaków.');
            });
        }

        if (!regExUsername.test(formData.username)) {
            setPossibleToSubmit(false);
            setErrorMessage((prevMessage) => {
                return prevMessage.concat('W polu nazwa użytkownika znajduje się pusty znak.');
            });
        }

        if (!regExEmail.test(formData.email)) {
            setPossibleToSubmit(false);
            setErrorMessage((prevMessage) => {
                return prevMessage.concat('Email nie jest poprawny.');
            });
        }

        if ((formData.password.length > 5) && (!regExSpecialChar.test(formData.password))) {
            setPossibleToSubmit(false);
            setErrorMessage((prevMessage) => {
                return prevMessage.concat('Hasło powinno zawierać przynajmniej jeden znak specjalny.');
            });
        }

        if ((formData.password.length > 5) && (!regExNumber.test(formData.password))) {
            setPossibleToSubmit(false);
            setErrorMessage((prevMessage) => {
                return prevMessage.concat('Hasło powinno zawierać przynajmniej jedeą cyfrę.');
            });
        }

        if (formData.password === '') {
            setPossibleToSubmit(false);
            setErrorMessage((prevMessage) => {
                return prevMessage.concat('Wpisz hasło.');
            });
        } else if (formData.password.length < 6) {
            setPossibleToSubmit(false);
            setErrorMessage((prevMessage) => {
                return prevMessage.concat('Hasło powinno posiadać przynajmniej 6 znaków.');
            });
        }

        if (formData.password !== formData.passwordRepeated) {
            setPossibleToSubmit(false);
            setErrorMessage((prevMessage) => {
                return prevMessage.concat('Powtórzone hasło się nie zgadza.');
            });
        }

        if (possibleToSubmit) {
            let submitData = { ...formData };
            delete submitData.passwordRepeated;
            axios.post('https://akademia108.pl/api/social-app/user/signup', submitData)
                .then((res) => {
                    setLoginMessage('Dodano nowego użytkownika.');
                    setTimeout(
                        clearLoginMessage
                    , 2000)
                    if (res.data.signedup) {
                        return setFormData((prevData) => {return { ...prevData, username: '', email: '', password: '', passwordRepeated: '' }});
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    const clearLoginMessage = () => {
        setLoginMessage('');
        setRerouteAfterSuccess(true);
    }

    return (
        <div className='formContainer'>
            {rerouteAfterSuccess && <Navigate to='/login' />}
            <h2 className='signUpHeader'>Sign up form</h2>
            <form className='signUpForm' onChange={updateFormData} onSubmit={submitData} noValidate>
                <label htmlFor='userName'>Nazwa użytkownika:</label>
                <input type='text' id='username' name='username' value={formData.username} onChange={updateFormData} />
                <label htmlFor='email'>e-mail:</label>
                <input type='email' id='email' name='email' value={formData.email} onChange={updateFormData} />
                <label htmlFor='password'>hasło:</label>
                <input type='password' id='password' name='password' value={formData.password} onChange={updateFormData} />
                <label htmlFor='passwordRepeated'>powtórz hasło:</label>
                <input type='password' id='passwordRepeated' name='passwordRepeated' value={formData.passwordRepeated} onChange={updateFormData} />
                <button className='btn'>Wyślij dane</button>
            </form>
            {errorMessage.map((message, index) => {
                return <p className='errorMessage' key={index}>{message}</p>
            })}
            <p className='loginMessage'>{loginMessage}</p>
        </div>
    )
}

export default SignUp;