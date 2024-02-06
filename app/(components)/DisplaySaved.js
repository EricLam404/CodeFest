'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import styles from './DisplaySaved.module.css'

const DisplaySaved = () => {
    const [type, setType] = useState(null);
    const [message, setMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const searchParams = useSearchParams()
    const router = useRouter();
    const DATA_SAVED = ["quiz", "cards", "session"]

    useEffect(() => {
        for (const [key, value] of searchParams.entries()) {
            if(DATA_SAVED.includes(key)){
                setType(key)
                setMessage(value)
                setIsVisible(true);
                router.replace("/")
            }
        }
    }, [])
    
    useEffect(() => {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 1000);
    
        return () => clearTimeout(timer);
    }, [isVisible]);
    return (
        type && <div className={`${styles.message} ${isVisible ? styles.visible : styles.hidden}`}>
            {type[0].toUpperCase() + type.substring(1)} has been {message}!
        </div>
    )
    }

export default DisplaySaved