import { useSelector } from "react-redux"
import classes from 'assets/5-components/Message.module.scss'
import { url } from '../_globalVar/_ip'
// const url5 = `http://localhost:3005/profile-picture`
const url5 = `${url}/profile-picture`
const Message = (props) => {
    const username = useSelector((state) => state.user.username)
    const profilePicture = useSelector((state) => state.user.profilePicture);
    const x = `${url5}/${props.sender}`;
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
