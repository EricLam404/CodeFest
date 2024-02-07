'use client';

import React, { useState, useEffect} from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Loading from '../(components)/Loading';
import ErrorMessage from '../(components)/ErrorMessage';
import styles from './page.module.css';

const Profile = () => {
  const { user, error, isLoading } = useUser();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const id = user.sub
            const response = await fetch(`/api/users/${id}/stats`, {
                method: "GET"
            });

            const statsData = await response.json();
            console.log(statsData)
            setStats(statsData.stats)
        } catch (error) {
            console.log(error);
        }
    };

      fetchData();
  }, [])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className={styles.container}>
        <a href="/api/auth/logout" className={styles.logoutLink}>
          Logout
        </a>
        <header className={styles.headerContainer}>
          <h2 className={styles.username}>{user?.name}</h2>
        </header>
        <ul className={styles.profileList}>
          <li>
            Email: <span className={styles.userInfo}>{user?.email}</span>
          </li>
          {stats.length !== 0 && (
            <>
              <li>Total quizzes saved: {stats.totalQuizzes}</li>
              <li>Total quizzes taken: {stats.quizTaken}</li>
              <li>Quizzes mean: {stats.quizStats.mean || 'N/A'}</li>
              <li>Quizzes median: {stats.quizStats.median || 'N/A'}</li>
              <li>Quizzes mode: {stats.quizStats.mode || 'N/A'}</li>
              <li>Total flashcards saved: {stats.totalFlashcards}</li>
              <li>Total study sessions saved: {stats.totalStudySessions}</li>
            </>
          )}
        </ul>
      </div>
    )
  );
}

export default withPageAuthRequired(Profile, {
    onRedirecting: () => <Loading />,
    onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});