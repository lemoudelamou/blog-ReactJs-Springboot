import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBJRg9ax_dQopQlbeoqgBnPANuXrmDkuRg",
    authDomain: "blogtech-c3909.firebaseapp.com",
    projectId: "blogtech-c3909",
    storageBucket: "blogtech-c3909.appspot.com",
    messagingSenderId: "463966345987",
    appId: "1:463966345987:web:3d4220763c34ebcf2aa736"
};

export const  app = initializeApp(firebaseConfig)
export const storage = getStorage(app)