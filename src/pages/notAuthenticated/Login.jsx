import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/user-actions"
import { userActions } from "../../store/user-slice"
import classes from "assets/6-pages/NotAuthenticated/Login.module.scss"
import logo from "../../img/logo.png"
import usernameImage from "../../img/username.png"
import passwordImage from "../../img/password.png"
import { NavLink } from "react-router-dom"
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }))
        setUsername('')
        setPassword('')
    }

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <section className={classes.loginSection}>
            <div>
                <img src={logo} />
                <p>Hanasu</p>
            </div>
            <div>
                <p>Login</p>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <img src={usernameImage} />
                        <input name='username' value={username} onChange={onChangeUsername} placeholder="username" autoComplete="off" />
                    </div>
                    <div>
                        <img src={passwordImage} />
                        <input name='password' value={password} onChange={onChangePassword} placeholder="password" autoComplete="off" type="password" />
                    </div>
                    <button>Sign in</button>
                </form>
            </div>
            <div>
                <div>
                    <p>Don’t have an account?</p>
                    <NavLink to="/signup" className={classes.navLink}>
                        <button>Sign up</button>
                    </NavLink>
                </div>
                <button>Forget password?</button>
            </div>
        </section>
    )

}

export default Login;