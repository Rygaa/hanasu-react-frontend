import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { send } from "../store/user-actions"
import { userActions } from "../store/user-slice"
import { socket } from '../App'
import classes from './Message.module.scss'

const Message = (props) => {
    const username = useSelector((state) => state.user.username)
    const profilePicture = useSelector((state) => state.user.profilePicture);
    const x = `http://38.133.52.102:3005/profile-picture/${props.sender}`;
    // <img className={classes.profilePicture} src={`data:${profilePicture.type};base64,${Buffer.from(profilePicture.data).toString('base64')}`}></img>

    return (
        <div className={(username == props.sender ? classes['message-me'] : classes['message-him'])}>
            <div >
                <p><span>{props.sender} {': '}</span> {props.message} </p>
            </div>
                <img className={classes.profilePicture} src={x} />
        </div>
    
    )
}


export default Message
