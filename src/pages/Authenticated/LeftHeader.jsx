import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { login, updateProfilePicture } from "../../store/user-actions"
import { userActions } from "../../store/user-slice"
import { uiActions } from "../../store/ui-slice"

import classes from "./LeftHeader.module.scss"
import logo from "../../img/logo.png"
import searchImage from "../../img/search.png"
import createImage from "../../img/create.png"
import joinImage from "../../img/join.png"
import settingsImage from "../../img/Settings.png"
import logoutImage from "../../img/Logout.png"
import leaveImage from "../../img/right arrow.png"

const LeftHeader = (props) => {
    const dispatch = useDispatch();
    const imgRef = useRef();
    const imgInputRef = useRef();
    const username = useSelector((state) => state.user.username)
    const profilePictureUpdated = useSelector((state) => state.user.profilePictureUpdated);
    const idToken = useSelector((state) => state.user.idToken)
    // const roomname = useSelector((state) => state.user.roomname)
    const roomname = localStorage.getItem('roomname')
    const showMenu = useSelector((state) => state.ui.showMenu);


    const disconnectOnClick = () => {
        dispatch(userActions.setToken(null));
        dispatch(userActions.setIsConnected(false));
        dispatch(userActions.setRoomname(''));
        dispatch(userActions.setSocketId(''));
        dispatch(userActions.setUsername(''));
    }

    useEffect(() => {
        if (profilePictureUpdated) {
            dispatch(userActions.setProfilePictureUpdated(false));
            imgRef.current.src = `https://api.hanasu.me/profile-picture/${username}[` + Math.random();
        }
    }, [profilePictureUpdated])

    const imgInputOnClick = () => {
        dispatch(updateProfilePicture({ idToken, picture: imgInputRef.current.files[0] }))
    }
    const imgOnClick = () => {
        imgInputRef.current.click();
    }

    const hide = () => {
        dispatch(uiActions.setShowMenu(!showMenu));

    }
    // {
    //     showMenu &&
    //     <button className={classes['hide-button']} onClick={hide}>X</button>

    // }

  
    return (
        <section className={classes.menu} id={(showMenu ? classes[""] : classes["hidden"])}>
            <div>
                <img src={logo} />
                <p>Hanasu</p>
            </div>
            <div>
                <NavLink to={decodeURI(window.location.pathname) == `/room/${roomname}` ? "/showmyrooms" : `/Room/${roomname}`}>
                    <button>{decodeURI(window.location.pathname) == `/room/${roomname}` ? 'Leave' : roomname}</button>
                </NavLink>
                <img src={leaveImage} />
            </div>
            <ul>
                <li>
                    <img src={searchImage}></img>
                    <NavLink to="/search" activeClassName={classes["activeLink"]} onClick={hide}>
                        <button>Search</button>
                    </NavLink>
                </li>
                <li>
                    <img src={createImage}></img>
                    <NavLink to="/create" activeClassName={classes["activeLink"]} onClick={hide}>
                        <button>Create room</button>
                    </NavLink>
                </li>
                <li>
                    <img src={joinImage}></img>
                    <NavLink to="/ShowMyRooms" activeClassName={classes["activeLink"]} onClick={hide}>
                        <button>Show my rooms</button>
                    </NavLink>
                </li>
                {/*<li>
                    <img src={settingsImage}></img>
                    <NavLink to="/Settings" activeClassName={classes["activeLink"]} onClick={hide}>
                        <button>Settings</button>
                </NavLink>
                </li>*/}
                <li>
                    <img src={logoutImage}></img>
                    <NavLink to="/login" activeClassName={classes["activeLink"]} onClick={hide}>
                        <button onClick={disconnectOnClick}>Logout</button>
                    </NavLink>
                </li>
            </ul>
            <div>
                <img ref={imgRef} onClick={imgOnClick}></img>
                <input type="file" type="file" ref={imgInputRef} onChange={imgInputOnClick} style={{ display: "none" }}></input>
                <p>{username}</p>
            </div>
       
       
    

         
        </section>
    )
}



export default LeftHeader;