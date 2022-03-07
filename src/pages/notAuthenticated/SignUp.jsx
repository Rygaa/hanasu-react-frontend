import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { signUp } from "../../store/user-actions";
import classes from "assets/6-pages/NotAuthenticated/SignUp.module.scss"
import emailImage from "../../img/email.png"
import usernameImage from "../../img/username.png"
import passwordImage from "../../img/password.png"
import logo from "../../img/logo.png"
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SignUp = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const history = useHistory();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(signUp({username, password, email, history}))
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
        <section className={classes['sign-up-section']}>
            <div className={classes['logo']}>
                <img src={logo} />
                <p>Hanasu</p>
            </div>
            <div className={classes['sign-up-container']}>
                <p>Create your account</p>
                <form onSubmit={onSubmitHandler}>
                    <div className={classes['div-inputs']}>
                        <img src={usernameImage} />
                        <input name='username' value={username} onChange={onChangeUsername} placeholder="username" autoComplete="off" />
                    </div>
                    <div className={classes['div-inputs']}>
                        <img src={emailImage} />
                        <input name='email' value={email} onChange={onChangeEmail} placeholder="email" autoComplete="off" />
                    </div>
                    <div className={classes['div-inputs']}>
                        <img src={passwordImage} />
                        <input name='password' value={password} onChange={onChangePassword} placeholder="password" type="password" />
                    </div>
                    <button>Confirm</button>
                </form>
            </div>
            <div className={classes['sign-up-container-bottom']}>
                <p>Already have an account?</p>
                <NavLink to="/login" className={classes['nav-link']}><button>Login</button></NavLink>
            </div>
        </section>
 

    )
}

export default SignUp;

// <label htmlFor='username'>username</label>
// <label htmlFor='password' >password</label>

