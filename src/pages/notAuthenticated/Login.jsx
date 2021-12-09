import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/user-actions"
import { userActions } from "../../store/user-slice"
import classes from "assets/6-pages/NotAuthenticated/Login.module.scss"
import logo from "../../img/logo.png"
import usernameImage from "../../img/username.png"
import passwordImage from "../../img/password.png"
import { NavLink } from "react-router-dom"
import { styled } from '@stitches/react';
import { CheckIcon } from '@radix-ui/react-icons';
import { blackA } from '@radix-ui/colors';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
const Login = () => {
    const html = document.documentElement
    const fontsizee = window.getComputedStyle(html).fontSize.split('p')[0]
    var fontsizer = (25 / 16) * fontsizee;
    const [fontsize, setFontsize] = useState(fontsizer);
    const rememberMe = localStorage.getItem('remember-me') === 'true' ? true : false
    const savedUsername = localStorage.getItem('username')
    const savedPassword = localStorage.getItem('password')
    const [username, setUsername] = useState(savedUsername)
    const [password, setPassword] = useState(savedPassword)
    const dispatch = useDispatch()



    const testtt = (e) => {
        console.log(rememberMe);
        localStorage.setItem('remember-me', e)
        localStorage.removeItem('username')
        localStorage.removeItem('password')
    }

    

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




    // console.log(fontsize);
    // console.log(size)



    const StyledCheckbox = styled(CheckboxPrimitive.Root, {
        all: 'unset',
        backgroundColor: 'rgba(222, 237, 255, 8%)',
        width: fontsize,
        height: fontsize,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        '&:hover': { backgroundColor: "rgba(222, 237, 255, 0.16)" },
    });
    window.addEventListener('resize', () => {
        var sizee = (25 / 16) * window.getComputedStyle(html).fontSize.split('p')[0]
        setFontsize(sizee);
    })
    const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
        color: '#4289F3',
    });

    // Exports
    const Checkbox = StyledCheckbox;
    const CheckboxIndicator = StyledIndicator;

    return (
        <section className={classes['login-section']}>
            <div className={classes['logo']}>
                <img src={logo} />
                <p>Hanasu</p>
            </div>
            <div className={classes['login-container']}>
                <p>Login</p>
                <form onSubmit={onSubmitHandler}>
                    <div className={classes['div-inputs']}>
                        <img src={usernameImage} />
                        <input name='username' value={username} onChange={onChangeUsername} placeholder="username" autoComplete="off" />
                    </div>
                    <div className={classes['div-inputs']}>
                        <img src={passwordImage} />
                        <input name='password' value={password} onChange={onChangePassword} placeholder="password" autoComplete="off" type="password" />
                    </div>
                    <div className={classes['div-checkbox-container']}>
                        <Checkbox id="c1" defaultChecked={rememberMe} onCheckedChange={testtt} >
                            <CheckboxIndicator>
                                <CheckIcon />
                            </CheckboxIndicator>
                        </Checkbox>
                        <label for="remeber_me">Remember me</label>
                    </div>
                    <button className={classes['connect-button']}>Connect</button>
                </form>
            </div>
            <div className={classes['login-container-bottom']}>
                <div>
                    <p>Don’t have an account?</p>
                    <NavLink to="/signup" className={classes['nav-link']}>
                        <button>Sign up</button>
                    </NavLink>
                </div>
                <button>Forget password?</button>
            </div>
        </section>
    )

}

export default Login;