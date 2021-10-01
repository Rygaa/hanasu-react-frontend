import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { signUp } from "../../store/user-actions";
import classes from "./SignUp.module.scss"
import emailImage from "../../img/email.png"
import usernameImage from "../../img/username.png"
import passwordImage from "../../img/password.png"
import logo from "../../img/logo.png"
import { NavLink } from "react-router-dom";

const SignUp = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(signUp({username, password, email}))
        setUsername('')
        setPassword('')
        setEmail('')
    }

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    
    return (
        <section className={classes.signUpSection}>
            <div>
                <img src={logo} />
                <p>Hanasu</p>
            </div>
            <div>
                <p>Create your account</p>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <img src={usernameImage} />
                        <input name='username' value={username} onChange={onChangeUsername} placeholder="username" autoComplete="off" />
                    </div>
                    <div>
                        <img src={emailImage} />
                        <input name='email' value={email} onChange={onChangeEmail} placeholder="email" autoComplete="off" />
                    </div>
                    <div>
                        <img src={passwordImage} />
                        <input name='password' value={password} onChange={onChangePassword} placeholder="password" type="password" />
                    </div>
                    <button>Confirm</button>
                </form>
            </div>
            <div>
                <p>Already have an account?</p>
                <NavLink to="/login" className={classes.navLink}>
                    <button>Login</button>
                </NavLink>
            </div>
        </section>
 

    )
}

export default SignUp;

// <label htmlFor='username'>username</label>
// <label htmlFor='password' >password</label>

