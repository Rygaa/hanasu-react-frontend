import { useDispatch, useSelector } from "react-redux"
import classes from "assets/5-components/Room.module.scss"
import { subscribe, unsubscribe } from "../store/room-actions"
import { userActions } from "../store/user-slice"
import { useHistory } from "react-router"

const Room = (props) => {
    const idToken = useSelector((state) => state.user.idToken)
    const roomname = useSelector((state) => state.user.roomname)
    const history = useHistory()

    const dispatch = useDispatch()
    const subscribeOnClick = () => {
        props.cleanInput()
        dispatch(subscribe({ idToken, roomname: props.roomname }))
    }
    const unsubscribeOnClick = () => {
        props.cleanInput()
        dispatch(unsubscribe({ idToken, roomname: props.roomname }))
    }

    const joinOnClick = () => {
        dispatch(userActions.setPreviousRoomname(props.roomname))
        dispatch(userActions.setRoomname(props.roomname));
        localStorage.setItem('roomname', props.roomname);
        history.push(`/room/${props.roomname}`)

    }

    return (
        <div className={(props.status == "Subscribe" ? classes['room-subscribe'] : classes['room-leave'])}>
            <p className={classes['name']}>{props.roomname}</p>
            <div className={classes['line']} />
            <p className={classes['players']}>{props.playersNumber}/{props.maxPlayersNumber}</p>
            <button className={classes['subscribe-button']} onClick={props.status == "Subscribe" ? subscribeOnClick : joinOnClick}>{props.status}</button>
            {props.status != "Subscribe" &&
                <button className={classes['leave-button']} onClick={unsubscribeOnClick}>X</button>
            }
        </div>
    )
}

export default Room;