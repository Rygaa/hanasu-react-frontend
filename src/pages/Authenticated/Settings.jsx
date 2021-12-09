import classes from "assets/6-pages/Authenticated/Settings.module.scss"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, updateProfilePicture, updateProfile, confirmUpdate } from "../../store/user-actions"
import Modal from 'react-modal';
import { url } from '../../_globalVar/_ip'
import { userActions } from "store/user-slice";
const url5 = `${url}/profile-picture/`

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');
const Settings = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(true);
    function openModal() {
        setIsOpen(true);
    }

    // function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#f00';
    // }

    function closeModal() {
        setIsOpen(false);
        dispatch(userActions.setSettingsSaved(false));

    }

    const settingsSaved = useSelector(state => state.user.settingsSaved);
    const username = useSelector(state => state.user.username);
    const email = useSelector(state => state.user.email);

    const [newUsername, setNewUsername] = useState(username);
    const [newEmail, setNewEmail] = useState(email);
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState(null);

    const dispatch = useDispatch();
    const imgInputRef = useRef();
    const idToken = useSelector((state) => state.user.idToken)

    // const imgInputOnClick = () => {
    //     dispatch(updateProfilePicture({ idToken, picture: imgInputRef.current.files[0] }))
    // }
    const pictureOnChange = (e) => {
        setPicture(imgInputRef.current.files[0])
    }
    const imgOnClick = () => {
        imgInputRef.current.click();
    }
    const updateOnClick = () => {
        // dispatch(updateProfile({ idToken, username: newUsername, email: newEmail }))
        dispatch(userActions.setSettingsSaved(true));
        setIsOpen(true);

    }
    const newEmailOnChange = (e) => {
        setNewEmail(e.target.value)
    }
    const newUsernameOnChange = (e) => {
        setNewUsername(e.target.value)
    }
    const newPasswordOnChange = (e) => {
        setNewPassword(e.target.value)
    }

    const accessOnClick = (e) => {
        dispatch(confirmUpdate({ idToken, password, newEmail, newUsername, newPassword, picture}))
        setPassword('');
    }
    const passwordOnChange = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        dispatch(userActions.setSettingsSaved(false));
    }, [])

    return (
        !!settingsSaved ?
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            className={classes['auth-modal']}
            overlayClassName={classes['auth-section-portal']}
            >
            <section className={classes['auth-section']}>
                <button onClick={closeModal}>X</button>
                <p className={classes['title']}>Confirm change</p>
                <input placeholder={'password'} value={password} className={classes['input']} onChange={passwordOnChange} />
                <button onClick={accessOnClick} className={classes['update-button']}>Submit</button>
            </section>
            </Modal> :
            <section className={classes['settings-section']}>
                <p className={classes['title']}>Settings</p>
                <div className={classes['profile-picture-container']}>
                    <img src={url5 + username}></img>
                    <button onClick={imgOnClick}> Update Profile Picture </button>
                </div>

                <input placeholder={'username'} value={newUsername} className={classes['input']} onChange={newUsernameOnChange} />
                <input placeholder={'email'} value={newEmail} className={classes['input']} onChange={newEmailOnChange} />
                <input type="password" placeholder={'new password'} className={classes['input']} onChange={newPasswordOnChange}/>
                <button onClick={updateOnClick} className={classes['update-button']}>UPDATE</button>
                <input type="file" type="file" ref={imgInputRef} onChange={pictureOnChange} style={{ display: "none" }}></input>
            </section>


 
        
    )
}

export default Settings;



// <section className={classes['auth-section']}>
//     <p className={classes['title']}>Auth</p>
//     <input placeholder={'password'} value={password} className={classes['input']} onChange={passwordOnChange} />
//     <button onClick={accessOnClick} className={classes['update-button']}>Access</button>
// </section>


// <section className={classes['settings-section']}>
//     <p className={classes['title']}>Settings</p>
//     <div className={classes['profile-picture-container']}>
//         <img src={url5 + username}></img>
//         <button onClick={imgOnClick}> Update Profile Picture </button>
//     </div>

//     <input placeholder={'username'} value={newUsername} className={classes['input']} onChange={usernameOnChange} />
//     <input placeholder={'email'} value={newEmail} className={classes['input']} onChange={emailOnChange} />
//     <input type="password" placeholder={'new password'} className={classes['input']} />
//     <button onClick={updateOnClick} className={classes['update-button']}>UPDATE</button>
//     <input type="file" type="file" ref={imgInputRef} onChange={imgInputOnClick} style={{ display: "none" }}></input>
// </section>