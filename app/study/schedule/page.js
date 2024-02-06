'use client'

import { useRouter } from 'next/navigation';
import { createQueryString } from '../../(components)/functions/CreateQueryString';
import React, { useState } from 'react';

const SessionForm = () => {
    const [sessionData, setSessionData] = useState({
        title: '',
        startTime: '',
        endTime: '',
    });
    const [warning, setWarning] = useState(false);

    const router = useRouter();

    const handleChange = (e) => {
        setSessionData({ ...sessionData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(sessionData.endTime <= sessionData.startTime){
            setWarning(true);
        } else {
            const id = "1"

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
    <form onSubmit={handleSubmit}>
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
  );
};

export default SessionForm;
