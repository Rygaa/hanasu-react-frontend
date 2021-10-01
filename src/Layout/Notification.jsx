import classes from "./Notification.module.scss"
import {notificationActions } from "../store/notification-slice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import errorImage from "../img/cancel.png"
import warningImage from "../img/warning.png"
import successImage from "../img/checked.png"

const Notification = (props) => {

    const dispatch = useDispatch();
    const messages = useSelector((state) => state.notifications.notifications);
    const notificationsLastUpdate = useSelector((state) => state.notifications.notificationsLastUpdate);
    const notificationType = useSelector((state) => state.notifications.notificationType)
    const status = (messages.length == 0 ? false : true)
    const [test, setTest] = useState(false)
    const closeOnClick = () => {
        setTest(false)
    }

    useEffect(() => {

        if (notificationsLastUpdate == 'REMOVED' || messages.length == 1) {
            setTimeout(() => {
                setTest(true)
                if (messages.length == 0) {
                    setTest(false)
                }
            }, 500)

           
            setTimeout(() => {
                if (messages.length > 0) {
                    setTest(false)
                    setTimeout(() => {
                        dispatch(notificationActions.setNotificationLastUpdate('REMOVED'))
                        dispatch(notificationActions.removeNotification('x'));
                        // console.log('removed');
                    }, 200)
             
                }
            }, 2000)
        }

    }, [messages])
    const testttt = () => {
        // console.log(notificationType);
        if (notificationType == "warning")
            return warningImage;
        if (notificationType == "error")
            return errorImage;
        if (notificationType == "success")
            return successImage;
    }
    // notificationType == "success" ? successImage : errorImage
    return (
        <aside className={(status ? classes['notification--displayed'] : classes['notification--hidden'] )}>
            <button onClick={closeOnClick}>X</button>
            <p>{messages.length > 0 && messages[0]}</p>
            {
                messages.length > 0 &&
                <img src={testttt()} />
            }
            
  
            
        </aside>

    )
 
}

export default Notification;



// console.log(notificationsLastUpdate);
// if (notificationsLastUpdate == "ADDED") {
//     const x = setTimeout(() => {
//         console.log('x');
//         if (messages.length > 0) {
//             dispatch(notificationActions.setNotificationLastUpdate('REMOVED'))
//             dispatch(notificationActions.removeNotification('x'));
//             console.log('removed');
//         } else {
//             console.log('clear');

//         }
//     }, 8000)
// } else if (notificationsLastUpdate == "REMOVED") {
//     clearTimeout(x)
// }