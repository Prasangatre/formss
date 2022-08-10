// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useState } from 'react'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBwHPb2kdg-xUK8pmWbJcYKbLWPEE3_Ies',
  authDomain: 'solor-98dc8.firebaseapp.com',
  projectId: 'solor-98dc8',
  storageBucket: 'solor-98dc8.appspot.com',
  messagingSenderId: '245055927491',
  appId: '1:245055927491:web:2c11a33b1aa6c6fd5d9e76',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
const storage = getStorage()
export function useAuth() {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user))
    return unsub
  }, [])

  return currentUser
}

export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png')

  setLoading(true)

  const snapshot = await uploadBytes(fileRef, file)
  const photoURL = await getDownloadURL(fileRef)

  updateProfile(currentUser, { photoURL })

  setLoading(false)
  alert('Uploaded file!')
}
