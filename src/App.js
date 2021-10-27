import { Fragment, useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Header from "./Layout/Header"
import Layout from "./Layout/Layout"
import Welcome from "./pages/notAuthenticated/Welcome";
import SignUp from "./pages/notAuthenticated/SignUp";
import Login from "./pages/notAuthenticated/Login";
import RoomPage from "./pages/Authenticated/RoomPage";
import LeftHeader from "./pages/Authenticated/LeftHeader";
import { useDispatch, useSelector } from "react-redux";
import { checkIdToken, searchRoom } from "./store/user-actions";
import ShowMyRooms from "./pages/Authenticated/ShowMyRooms";
import { userActions } from "./store/user-slice";
import socketIOClient from "socket.io-client";
import CreateRoom from "./pages/Authenticated/CreateRoom";
import SearchRoom from "./pages/Authenticated/SearchRoom";
export const socket = socketIOClient('ws://api.hanasu.me', {
  path:'/mysocket/'
});
// export const socket = socketIOClient('ws://localhost:3005', {
//   path: '/mysocket/'
// });


function App() {
  const dispatch = useDispatch();
  const [test, setTest] = useState(0)
  const isConnected = useSelector((state) => state.user.isConnected);
  const messages = useSelector((state) => state.user.messages);
  // const roomname = useSelector((state) => state.user.roomname);
  const roomname = localStorage.getItem('roomname')
  const idToken = localStorage.getItem('idToken')
  const history = useHistory();

  // useEffect(() => {
 

  // }, [])
  console.log('reloaded');
  useEffect(() => {
    setTest(test + 1)
    console.log(test);
    if (test == 4) {
      socket.emit('connection', 0)
      console.log('connection emitted');

      socket.on('connected', (socketId) => {
        console.log('connected with server as socket:', socketId)
        dispatch(userActions.setSocketId(socketId));
      })

    }

 

    socket.on('joined', (data) => {
      dispatch(userActions.setInRoom(true));
      console.log(data);
      dispatch(userActions.cleanMessages())
    })
  }, [isConnected])

 

  useEffect(() => {
    if (idToken && idToken != 'null') {
      dispatch(userActions.setToken(idToken));
      dispatch(checkIdToken({ idToken }))
    } else {
      dispatch(userActions.setIsConnected(false));
    }

 
  }, [dispatch])
  if (isConnected === null) {
    return <h1>Loading</h1>
  }


  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          {!!isConnected && <Redirect to='/ShowMyRooms'></Redirect>}
          {!isConnected && <Redirect to='/Login'></Redirect>}
        </Route>

        <Route path='/SignUp' exact>
          {!!isConnected && <Redirect to='/ShowMyRooms'></Redirect>}
            {!isConnected && <SignUp />}
        </Route>

        <Route path='/Login' exact>
          {!!isConnected && <Redirect to='/ShowMyRooms'></Redirect>}
            {!isConnected && <Login />}
        </Route>

        <Route path='/ShowMyRooms' exact >
        {!!isConnected && 
          <Fragment>
            <LeftHeader></LeftHeader>
            <ShowMyRooms></ShowMyRooms>
          </Fragment>
        }
        
        {!isConnected &&
          <Fragment>
            <Redirect to='/'></Redirect>
          </Fragment>
        }
  
        </Route>
        <Route path={`/Room/:roomname`}>
          {!!isConnected &&
            <Fragment>
              <LeftHeader></LeftHeader>
              <RoomPage></RoomPage>

            </Fragment>
          }

          {!isConnected &&
            <Fragment>
              <Redirect to='/'></Redirect>
            </Fragment>
          }

    
        </Route>
      
        <Route path='/create' exact>
          {!!isConnected &&
            <Fragment>
              <LeftHeader></LeftHeader>
              <CreateRoom></CreateRoom>

            </Fragment>
          }

          {!isConnected &&
            <Fragment>
              <Redirect to='/'></Redirect>
            </Fragment>
          }
        </Route>
      

        <Route path='/search' exact>
          {!!isConnected &&
            <Fragment>
              <LeftHeader></LeftHeader>
              <SearchRoom></SearchRoom>

            </Fragment>
          }

          {!isConnected &&
            <Fragment>
              <Redirect to='/'></Redirect>
            </Fragment>
          }
        </Route>
        </Switch>
    </Layout>
  );
}

export default App;
