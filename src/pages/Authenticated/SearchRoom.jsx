import classes from "./SearchRoom.module.scss"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { search } from "../../store/room-actions"
import { roomsActions } from "../../store/room-slice"
import Room from "../../components/Room"
import roomIdImage from "../../img/roomId.png"

const SearchRoom = () => {
    const dispatch = useDispatch()
    const [inputedRoomId, setInputedRoomId] = useState('')
    const [displayedRooms, setDisplayedRooms] = useState([])
    const idToken = useSelector((state) => state.user.idToken)
    const searchedRooms = useSelector((state) => state.rooms.searchedRooms)
    const showMenu = useSelector((state) => state.ui.showMenu);


    const updateRooms = async () => {
        const temporary = []
        for (let i = 0; i < searchedRooms.length; i++) {
            console.log(searchedRooms);
            temporary.push(
                <Room
                    key={i}
                    roomname={searchedRooms[i].roomname}
                    maxPlayersNumber={searchedRooms[i].maxPlayersNumber}
                    playersNumber={searchedRooms[i].playersNumber}
                    status={'Subscribe'}
                    cleanInput={cleanInput}
                />
            )
        }
        setDisplayedRooms(temporary);
    }
    
    const cleanInput = () => {
        setInputedRoomId('')
    }

    const onChangeRoom = async (e) => {
        setInputedRoomId(e.target.value)
        dispatch(search({ idToken, roomname: e.target.value }))
    }

    useEffect(() => {
        dispatch(roomsActions.setSearchedRooms([]))
    }, [])

    useEffect(() => {
        updateRooms()
    }, [searchedRooms])

    return (
        <section className={classes['search-room']} id={(showMenu ? classes["blur"] : classes[""])}>
            <p>Search</p>
            <form>
                <div>
                    <img src={roomIdImage} />
                    <input name='inputedRoomId' value={inputedRoomId} onChange={onChangeRoom} placeholder="room name" autoComplete="off" />
                </div>
            </form>
            <div>{displayedRooms}</div>
        </section>
    )
}

export default SearchRoom;