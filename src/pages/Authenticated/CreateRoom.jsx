import classes from "./CreateRoom.module.scss"
import roomIdImage from "../../img/roomId.png"
import maxPlayerImage from "../../img/maxPlayer.png"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../store/room-actions"

const CreateRoom = () => {
    const dispatch = useDispatch()
    const [inputedRoomId, setInputedRoomId] = useState('')
    const [maxPlayersNumber, setMaxPlayersNumber] = useState(5)
    const idToken = useSelector((state) => state.user.idToken)
    const showMenu = useSelector((state) => state.ui.showMenu);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(create({ idToken, roomname: inputedRoomId, maxPlayersNumber}))
        setInputedRoomId('')
        setMaxPlayersNumber(5)
    }

    const onChangeInputedRoomId = (e) => {
        setInputedRoomId(e.target.value)
    }

    const onChangeMaxPlayer = (e) => {
        setMaxPlayersNumber(e.target.value)
    }

    return (
        <section className={classes['create-room']} id={(showMenu ? classes["blur"] : classes[""])}>
            <p>Create a room</p>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <img src={roomIdImage} />
                    <input name='inputedRoomId' value={inputedRoomId} onChange={onChangeInputedRoomId} placeholder="room name" autoComplete="off" />
                </div>
                <div>
                    <img src={maxPlayerImage} />
                    <input name='maxPlayersNumber' value={maxPlayersNumber} onChange={onChangeMaxPlayer} placeholder="max players"  type="number" min="5"/>
                </div>
                <button>Submit</button>
            </form>
        </section>
    )
}

export default CreateRoom;