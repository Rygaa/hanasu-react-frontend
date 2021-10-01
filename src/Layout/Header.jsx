import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import classes from "./Header.module.scss"

const Header = (props) => {
    const isConnected = useSelector((state) => state.user.isConnected);
    return (
        <header className={(isConnected ? classes.headerr : classes.header)}>
            {isConnected &&
                <NavLink className={classes.buttons} to='/'><button>Disconnect</button></NavLink>
            }
        
            {!isConnected && 
                <ul className={classes.div}>
                    <li><NavLink to='/' className={classes.link} >Dashboard</NavLink></li>
                    <li><NavLink to='/SignUp' className={classes.link}>Sign Up</NavLink></li>
                    <li><NavLink to='/Login' className={classes.link}>Login</NavLink></li>
                    <li><NavLink to='/' className={classes.link}>About us</NavLink></li>
                </ul>
            }

        </header>

    )
}

export default Header