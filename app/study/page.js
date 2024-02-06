'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loading from "../(components)/Loading";

const Page = () => {
    const [sessions, setSessions] = useState(null);
    const { user, isLoading } = useUser()

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
            {   
                isLoading ? <Loading /> :
                user ? 
                <div>
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
                </div> :
                <div>Log in to create study sessions</div>
                }
        </div>
    );
};

export default Page;
