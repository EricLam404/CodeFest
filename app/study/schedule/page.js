'use client'

import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import { createQueryString } from '../../(components)/functions/CreateQueryString';
import React, { useState } from 'react';
import { useUser , withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Loading from '../../(components)/Loading';
import ErrorMessage from '../../(components)/ErrorMessage';


const Session = () => {
    const [sessionData, setSessionData] = useState({
        title: '',
        startTime: '',
        endTime: '',
    });
    const [warning, setWarning] = useState(false);

    const router = useRouter();
    const { user } = useUser();

    const handleChange = (e) => {
        setSessionData({ ...sessionData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(sessionData.endTime <= sessionData.startTime){
            setWarning(true);
        } else {
            const id = user.sub

            const res = await fetch(`/api/users/${id}/session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    session: sessionData
                }),
            })

            if(!res.ok){
                throw new Error("Failed to add study session")
            } 
            router.refresh()
            router.push("/" + '?' + createQueryString('session', 'added'))
        }
    };  

  return (
    <div className={styles.container}>
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.name}>Add a study session</div>
      <label>
        Title:
        <input type="text" name="title" value={sessionData.title} onChange={handleChange} />
      </label>
      <label>
        Start Time:
        <input type="datetime-local" name="startTime" value={sessionData.startTime} onChange={handleChange} />
      </label>
      <label>
        End Time:
        <input type="datetime-local" name="endTime" value={sessionData.endTime} onChange={handleChange} />
      </label>
      {warning && <div>End time cannot be before start time</div>}
      <button type="submit">Save Session</button>
    </form>
    </div>
  );
};

export default withPageAuthRequired(Session, {
  onRedirecting: () => <Loading />,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
