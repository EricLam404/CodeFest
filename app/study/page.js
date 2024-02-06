'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [sessions, setSessions] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = "1"
                const response = await fetch(`/api/users/${id}/session`, {
                    method: "GET"
                });

                const sessionData = await response.json();
                console.log(sessionData.studySessions)
                setSessions(sessionData.studySessions)
            } catch (error) {
                console.log(error);
            }
        };
        if(!sessions) fetchData()
    }, [])
    return (
        <div>
            <h2>Your Study Sessions</h2>
            <Link href={"/study/schedule"}>
                <div>Add a study session</div>
            </Link>
            {sessions ? <ul>
                {sessions.map((session) => (
                <li key={session._id}>
                    {session.title}: {new Date(session.startTime).toLocaleString()} -{' '}
                    {new Date(session.endTime).toLocaleString()}
                </li>
                ))}
            </ul>: 
            <div>
                You have no study sessions, please add one
            </div>
            }
        </div>
    );
};

export default Page;
