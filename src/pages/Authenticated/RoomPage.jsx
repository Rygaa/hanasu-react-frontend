import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "../../store/user-slice"
import {socket} from '../../App'
import classes from "assets/6-pages/Authenticated/Room.module.scss"

import Message from "../../components/Messages"
import { useHistory } from "react-router"
const RoomPage = () => {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const messagesRef = useRef();
    const history = useHistory();
    const roomname = localStorage.getItem('roomname')
    const username = useSelector((state) => state.user.username)
    const messages = useSelector((state) => state.user.messages)
    const idToken = useSelector((state) => state.user.idToken)
    const [messagesArr, setMessagesArr] = useState([])
  
    useEffect(() => {
        history.push(`/room/${roomname}`)
        socket.emit('connect-to-room', { idToken, roomname: roomname })
        socket.off('message-received-from-server')
        socket.on('message-received-from-server', (data) => {
            dispatch(userActions.addMessage(data))
            console.log(data);
            setMessagesArr(messagesArr => [...messagesArr, 
                <Message
                    key={Math.random()}
                    sender={data.sender}
                    message={data.message}>
                </Message>
            ])
        })
    }, [])


    const onSubmitHandler = (e) => {
        e.preventDefault();
        socket.emit('message-received-from-client', { roomname, sender: username, message })
        setMessage('')
    }

    const onChangeRoom = (e) => {
        setMessage(e.target.value)
    }

    useEffect(() => {
        if (messagesRef.current != null) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    }, [messagesArr])
  
    return <section className={classes.roomSection}>
        <p>{roomname == "" ? "Room name..." : roomname}</p>
        <div ref={messagesRef}> {messagesArr} </div>
        <form onSubmit={onSubmitHandler}>
            <input className={roomname == "" ? classes['message-input-disable'] : classes['message-input-enable']}
                name='message' 
                value={message} 
                onChange={onChangeRoom} 
                disabled={roomname == "" ? true : false}
            />
            
            <button></button>
        </form>

    </section>
    

}

export default RoomPage;