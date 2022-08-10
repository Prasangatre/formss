import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuth, upload } from "../../Firebase";
import InputControl from "../InputControl/InputControl";
// import {getAuth, onAuthStateChanged, updateProfile} from "firebase/auth"
import styles from "./HomePage.module.css";
const HomePage = () => {
  const [username, setusername] = useState("");
  const [field, setfield] = useState(false);
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading);
    // updateProfile(currentUser,)
  }
  function handleEdit() {
    setfield(true);
  }
  async function saved() {
    await updateProfile(currentUser, {
      displayName: username,
    });
    console.log(currentUser);
    setfield(false);
  }
  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser?.photoURL);
    }
  }, [currentUser]);

  return (
    <div className={styles.container}>
      <InputControl type="file" onChange={handleChange} />
      <button disabled={loading || !photo} onClick={handleClick}>
        Upload
      </button>
      <img className={styles.img} src={photoURL} alt="Avatar" />
      <div className={styles.text}>UserName is:{currentUser?.displayName}</div>
      <button className={styles.button} onClick={handleEdit}>
        Edit Name
      </button>
      {field ? (
        <div>
          <InputControl
            type="text"
            onChange={(e) => setusername(e.target.value)}
          />
          <button className={styles.button} onClick={saved}>
            Save
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default HomePage;
