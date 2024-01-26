import styles from './page.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        CodeFest Project
      </div>
      <Link href="/quiz">
          <div className={styles.link}>Go to Quiz</div>
      </Link>
    </main>
  )
}
