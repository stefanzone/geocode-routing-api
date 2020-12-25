import ExternalLink from '../Link/ExternalLink/ExternalLink';
import styles from './Footer.module.css';

const Footer = () => {
  let copyrightYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {copyrightYear}
        <ExternalLink text="Stefan Kühnel" href="https://9bn.de/sk" spaceBefore />, All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
