import { doc, onSnapshot } from 'firebase/firestore';
import { FunctionComponent, useEffect, useState } from 'react';
import Title from '../components/Common/Title';
import FilmListViewForBookmarkAndHistory from '../components/FilmListViewForBookmarkAndHistory/FilmListViewForBookmarkAndHistory';
import Footer from '../components/Footer/Footer';
import { db } from '../shared/firebase';
import { Item } from '../shared/types';
import { useAppSelector } from '../store/hooks';

interface HistoryProps {}

const History: FunctionComponent<HistoryProps> = () => {
	const currentUser = useAppSelector((state) => state.auth.user);
	const [history, setFilmsHistory] = useState<Item[]>([]);
	const [isLoading, setIsLoading] = useState(
		!history.length
	);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (!currentUser) return;

		const unsubDoc = onSnapshot(
			doc(db, 'users', currentUser?.uid),
			(doc) => {
				setFilmsHistory(doc.data()?.history?.slice().reverse() || []);
				setIsLoading(false);
			},
			(error) => {
				alert(error);
				setFilmsHistory([]);
				setIsLoading(false);
				setIsError(true);
			}
		);

		return () => unsubDoc();
	}, [currentUser]);

	if (isError) return <div>ERROR</div>;

	return (
		<>
			<Title value="History | Moonlight" />
			<FilmListViewForBookmarkAndHistory
				films={history}
				isLoading={isLoading}
				pageType="history"
			/>

			<Footer />
		</>
	);
};

export default History;
