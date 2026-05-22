import styles from "./page.module.css";

function loading() {
  return <div className={styles.loading_ssr}>LOADING</div>;
}

export default loading;