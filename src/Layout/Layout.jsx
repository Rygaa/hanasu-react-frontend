import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { userActions } from "../store/user-slice";
import { uiActions } from "../store/ui-slice";
import Header from "./Header"
import classes from "./Layout.module.scss";
import Notification from "./Notification";
const Layout = (props) => {
  const isConnected = useSelector((state) => state.user.isConnected);
  const dispatch = useDispatch();

  const notificationDisplay = useSelector((state) => state.notifications.notificationDisplay)
  const showMenu = useSelector((state) => state.ui.showMenu);

  const returnToMenuOnClick = () => {
    dispatch(uiActions.setShowMenu(!showMenu));
  }
  useEffect(() => {
    
  }, [notificationDisplay])

  const trtrt = () => {
    dispatch(uiActions.setShowMenu(!showMenu));
  }
    return (
      <div className={(isConnected ? classes['layout-connected'] : classes['layout-disconnected'])}>
        <Notification status={notificationDisplay} message={"this is rfsfsdfsdf"}></Notification>
        <main className={(isConnected ? classes['main-connected'] : classes['main-disconnected'])}>
          {isConnected &&
            <div></div>
          }
          {props.children}
          {showMenu &&
            <div className={classes['hide-div']} onClick={trtrt}></div>
          }

    
        </main>
        {isConnected &&
          <div className={classes["back-to-menu"]} style={showMenu ? { display: "none" } : { display: "flex" }}>
            <button onClick={returnToMenuOnClick} ></button>
            <p></p>
          </div>
        }
  

      </div>
    )
}

export default Layout