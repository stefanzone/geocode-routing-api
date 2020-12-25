import Link from 'next/link';

import styles from './Logo.module.css';

const Logo = () => {
  return (
    <Link href="/">
      <a className={styles.container}>
        <img src="/logo.svg" width="25" height="25" alt="GeoCode Routing API Logo" />
      </a>
    </Link>
  );
};

export default Logo;
