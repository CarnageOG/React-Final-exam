import Link from "next/link";
import styles from "./page.module.css";

function NotFound() {
  return (
    <div className={styles.notfound_ssr}>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link className={styles.notfound_link} href="/">Go back to Home</Link>
    </div>
  );
}

export default NotFound;