import styles from './page.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.startPageContainer}>
        <div className={styles.description}>
          <h1>CodeFest Project</h1>
        </div>
  
        <div className={styles.linkContainer}>
          <Link className={styles.linkComponent} href="/quiz">
              <div className={styles.link}>Go to Quiz</div>
          </Link>
        </div>

        <div className={styles.linkContainer}>
          <Link className={styles.linkComponent} href="/flashcards">
              <div className={styles.link}>Flashcards</div>
          </Link>
        </div>

      </div>
      
    </main>
  )
}
