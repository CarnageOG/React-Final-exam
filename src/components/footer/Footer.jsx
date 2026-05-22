import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <>
            <div className={styles.footer_layout}>
                <div className={styles.footer_wrapper}>
                    <div className={styles.footer}>
                        <div className={styles.footer_div}>
                            <p>Conditions of Use</p>
                            <p>Privacy Notice</p>
                            <p>Interest-Based Ads</p>
                        </div>
                        <div>
                            © 1991-2021, Amazon.com, inc. or its affiliates
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;