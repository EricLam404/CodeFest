'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import styles from './DisplaySaved.module.css'

const DisplaySaved = () => {
    const [isVisible, setIsVisible] = useState(false);
    const searchParams = useSearchParams()
    const router = useRouter();

    useEffect(() => {
        const search = searchParams.get('quiz')
        if(search === "added"){
            setIsVisible(true);
            router.replace("/")
        }
    }, [])
    
    useEffect(() => {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 1000);
    
        return () => clearTimeout(timer);
    }, [isVisible]);
    return (
        <div className={`${styles.message} ${isVisible ? styles.visible : styles.hidden}`}>
            Quiz has been added!
        </div>
    )
    }

export default DisplaySaved