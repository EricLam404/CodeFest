import styles from './page.module.css'
import Link from 'next/link';
import Navbar from './(components)/Navbar';
import DisplaySaved from './(components)/DisplaySaved';
import React, { Suspense } from 'react'

export default function Home() {
  function DisplaySavedFallback() {
    return <></>
  }

  return (
    <main className={styles.main}>
      <div>
        <Navbar/>
      </div>

      <div className={styles.centerBox}>

        <div className={styles.startPageContainer}>
          <div className={styles.description}>
            <h1>Brain Buddy - Codefest 2024</h1> 
              <p className={styles.smallText}>Brain Buddy is an innovative AI-powered education platform that tailors personalized study plans, adaptive quizzes, and collaborative learning experiences, providing students with real-time progress tracking and motivational support for an engaging and effective learning journey</p>    
          </div>
          {/* used to say: CodeFest Project */}
    
          <div className={styles.linkContainer}>
            <Link className={styles.linkComponent} href="/create-quiz">
                <div className={styles.link}>Create a Quiz!</div>
            </Link>
          </div>

          <div className={styles.linkContainer}>
            <Link className={styles.linkComponent} href="/flashcards">
                <div className={styles.link}>Create Flashcards!</div>
            </Link>
          </div>

          {/* LOGIN PAGE -- NOT WORKING */}
          {/* <div className={styles.linkContainer}>
            <Link className={styles.linkComponent} href="/src">
                <div className={styles.link}>Login</div>
            </Link>
          </div> */}
        </div>

        <div className={styles.pageContainer1}>
          {/*<div className={styles.description}>
            <h1>CodeFest Project</h1>
            </div>*/}
    
          <div className={styles.linkContainer1}>
            <Link className={styles.linkComponent} href="/quiz">
                <div className={styles.link}>Quizzes</div>
            </Link>
          </div>

          <div className={styles.linkContainer1}>
            <Link className={styles.linkComponent} href="/flashcards/savedCards">
                <div className={styles.link}>Saved Flashcards</div>
            </Link>
          </div>
        </div>

        <Suspense fallback={<DisplaySavedFallback />}>
          <DisplaySaved />
        </Suspense>
      </div>
    </main>
  )
}

