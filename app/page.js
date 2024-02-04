import styles from './page.module.css'
import Link from 'next/link';
import DisplaySaved from './(components)/DisplaySaved';

export default function Home() {

  return (
    <main className={styles.main}>
      <DisplaySaved />
      <div className={styles.startPageContainer}>
        <div className={styles.description}>
          <h1>Brain Buddy</h1> 
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
      
    </main>
  )
}

