import { useDispatch, useSelector } from "react-redux"
import classes from "./Room.module.scss"
import { login } from "../store/user-actions"
import { subscribe, join, connect, unsubscribe } from "../store/room-actions"
import { userActions } from "../store/user-slice"
import { socket } from '../App'
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
        <div className={classes.div}>
            <p>{props.roomname}</p>
            <div></div>
            <p>{props.playersNumber}/{props.maxPlayersNumber}</p>
            <button onClick={props.status == "Subscribe" ? subscribeOnClick : joinOnClick}>{props.status}</button>
            {props.status != "Subscribe" &&
                <button onClick={unsubscribeOnClick}>X</button>
            }
            
        </div>
    )
}

export default Room;