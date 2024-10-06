import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
// 	apiKey: "AIzaSyBiO4NTttc68zMHFkRFXyK5qLsU9zXsJmg",
// 	authDomain: "moonlight-40ecf.firebaseapp.com",
// 	projectId: "moonlight-40ecf",
// 	storageBucket: "moonlight-40ecf.appspot.com",
// 	messagingSenderId: "1043878072437",
// 	appId: "1:1043878072437:web:0fd78f6e64f3cfbe2d283c",
// };

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_apiKey,
	authDomain: process.env.REACT_APP_FIREBASE_authDomain,
	projectId: process.env.REACT_APP_FIREBASE_projectId,
	storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
	messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
	appId: process.env.REACT_APP_FIREBASE_appId,
	measurementId: process.env.REACT_APP_FIREBASE_measurementId,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyC5V0Pm-YJV9h0kyX9aBgrKrs3_J3R2Foo",
//   authDomain: "pvt-comments.firebaseapp.com",
//   databaseURL: "https://pvt-comments-default-rtdb.firebaseio.com",
//   projectId: "pvt-comments",
//   storageBucket: "pvt-comments.appspot.com",
//   messagingSenderId: "700353567702",
//   appId: "1:700353567702:web:f36bbbae9c78ac1e3ea277",
// };
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
// });
export const auth = getAuth(app);
