import { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { join } from "../../store/room-actions"
import { userActions } from "../../store/user-slice"
import classes from "./ShowMyRooms.module.scss"
import { socket } from "../../App"
import Room from "../../components/Room"
const Join = (props) => {
    const dispatch = useDispatch()
    const [inputedRoomId, setInputedRoomId] = useState('11')
    const [arr, setArr] = useState([])
    const idToken = useSelector((state) => state.user.idToken)
    const rooms = useSelector((state) => state.rooms.myRooms)
    const showMenu = useSelector((state) => state.ui.showMenu);

    const updateRooms = async () => {
        const temporary = []
        for (let i = 0; i < rooms.length; i++) {
            temporary.push(
                <Room
                    key={i}
                    roomname={rooms[i].roomname}
                    maxPlayersNumber={rooms[i].maxPlayersNumber}
                    playersNumber={rooms[i].playersNumber}
                    status={"Connect"}
                    cleanInput={cleanInput}
                />
            )
        }
        setArr(temporary);
    }
    
    useEffect(async () => {
        await updateRooms();
    }, [rooms])
    const cleanInput = () => {
        setInputedRoomId('')
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(userActions.setRoomId(''))
        dispatch(userActions.setUsername(''))

    }

    useEffect(() => {
        console.log('join');
        dispatch(join({ idToken }))

    }, [])

    const onChangeRoom = (e) => {
        setInputedRoomId(e.target.value)
    }

    return <section className={classes['show-my-rooms']} id={(showMenu ? classes["blur"] : classes[""])}>
        <p>{`My rooms`}</p>
        <div>{arr}</div>
        <p>...</p>
    </section>
    
    
}

export default Join;