import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
// import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from '@vercel/speed-insights/react';

import Protected from './components/Common/Protected';
import Auth from './pages/Auth';
import Bookmarked from './pages/Bookmarked';
import Error from './pages/Error';
import Explore from './pages/Explore';
import History from './pages/History';
import Home from './pages/Home';
import MovieInfo from './pages/Movie/MovieInfo';
import MovieWatch from './pages/Movie/MovieWatch';
import Profile from './pages/Profile';
import Search from './pages/Search';
import TVInfo from './pages/TV/TVInfo';
import TVWatch from './pages/TV/TVWatch';
import { auth, db } from './shared/firebase';
import { useAppDispatch } from './store/hooks';
import { setCurrentUser } from './store/slice/authSlice';
import { API_URL } from './shared/constants';

function App() {
	const location = useLocation();
	const dispatch = useAppDispatch();
	// const currentUser = useAppSelector((state) => state.auth.user);
	const [isSignedIn, setIsSignedIn] = useState(
		Number(localStorage.getItem('isSignedIn')) ? true : false
	);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				dispatch(setCurrentUser(null));
				setIsSignedIn(false);
				localStorage.setItem('isSignedIn', '0');
				return;
			}

			setIsSignedIn(true);
			localStorage.setItem('isSignedIn', '1');

			if (user.providerData[0].providerId === 'google.com') {
				onSnapshot(doc(db, 'users', user.uid), (doc) => {
					dispatch(
						setCurrentUser({
							displayName:
                doc.data()?.lastName + ' ' + doc.data()?.firstName || '',
							email: user.email,
							emailVerified: user.emailVerified,
							photoURL: doc.data()?.photoUrl || '',
							uid: user.uid,
						})
					);
				});
			} else if (user.providerData[0].providerId === 'facebook.com') {
				onSnapshot(doc(db, 'users', user.uid), (doc) => {
					dispatch(
						setCurrentUser({
							displayName:
                doc.data()?.lastName + ' ' + doc.data()?.firstName || '',
							email: user.email,
							emailVerified: user.emailVerified,
							photoURL: doc.data()?.photoUrl || '',
							// user.photoURL + "?access_token=" + doc.data()?.token || "",
							// doc.data()?.photoUrl.startsWith("https://i.ibb.co") ?
							uid: user.uid,
						})
					);
				});
			} else {
				onSnapshot(doc(db, 'users', user.uid), (doc) => {
					dispatch(
						setCurrentUser({
							displayName:
                doc.data()?.lastName + ' ' + doc.data()?.firstName || '',
							photoURL: doc.data()?.photoUrl || '',
							email: user.email,
							emailVerified: user.emailVerified,
							uid: user.uid,
						})
					);
				});
			}
		});
	}, [dispatch]);

	useEffect(() => {
		window.scrollTo(0, 0);
		toast.dismiss();
	}, [location.pathname, location.search]);

	useEffect(() => {
		const isMovieDbAvailable = localStorage.getItem('moviedb');
		if (!isMovieDbAvailable) {
			const isMovieDbAPIWorking = async() => {
				try {
					await axios.get(`${API_URL}/configuration?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`);
					localStorage.setItem('moviedb', 'true');
					window.location.reload();
				} catch (error) {
					localStorage.setItem('moviedb', 'false');
				}
			};
			isMovieDbAPIWorking();
		}
	}, []);

	return (
		<>
			<Toaster />
			{/* <Analytics />
			<SpeedInsights /> */}
			<Routes>
				<Route index element={<Home />} />
				<Route path="movie/:id" element={<MovieInfo />} />
				<Route path="tv/:id" element={<TVInfo />} />
				<Route path="movie/:id/watch" element={<MovieWatch />} />
				<Route path="tv/:id/watch" element={<TVWatch />} />
				<Route path="explore" element={<Explore />} />
				<Route path="search" element={<Search />} />
				<Route path="auth" element={<Auth />} />
				<Route
					path="bookmarked"
					element={
						<Protected isSignedIn={isSignedIn}>
							<Bookmarked />
						</Protected>
					}
				/>
				<Route
					path="history"
					element={<Protected isSignedIn={isSignedIn}>{<History />}</Protected>}
				/>
				<Route
					path="profile"
					element={
						<Protected isSignedIn={isSignedIn}>
							<Profile />
						</Protected>
					}
				/>
				<Route path="*" element={<Error />} />
			</Routes>
		</>
	);
}

export default App;
