import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import classes from "assets/4-layout/Layout.module.scss"

import Notification from "./Notification";
const Layout = (props) => {
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.user.isConnected);
  const [navDisplay, setNavDisplay] = useState(false)

  const notificationDisplay = useSelector((state) => state.notifications.notificationDisplay)
  const showMenu = useSelector((state) => state.ui.showMenu);

  useEffect(() => {
    window.innerWidth < 1000 ? setNavDisplay(true) : setNavDisplay(false)
    window.addEventListener('resize', () => {
      window.innerWidth < 1000 ? setNavDisplay(true) : setNavDisplay(false)
    })
  }, [])

  const returnToMenuOnClick = () => {
    dispatch(uiActions.setShowMenu(!showMenu));
  }
  useEffect(() => {
    
  }, [notificationDisplay])

  const trtrt = () => {
    dispatch(uiActions.setShowMenu(!showMenu));
  }
    return (
      <div className={classes['layout']}>
        <main className={(isConnected ? classes['main-connected'] : classes['main-disconnected'])}>
          {props.children}
        </main>

        <Notification status={notificationDisplay} message={"this is rfsfsdfsdf"}></Notification>
        {showMenu && <div className={classes['hide-div']} onClick={trtrt} />}
        {(isConnected && navDisplay) &&
          <div 
            className={classes["back-to-menu"]} 
            style={showMenu ? { display: "none" } : { display: "flex" }} 
            onClick={returnToMenuOnClick} 
          />
        }
      </div>
    )
}

export default Layout