import Image from 'next/image';
import Link from 'next/link';

import styles from './Logo.module.css';

const Logo = () => {
  return (
    <Link href="/">
      <a className={styles.container}>
        <Image src="/logo.svg" alt="GeoCode Routing API Logo" width={25} height={25} />
      </a>
    </Link>
  );
};

export default Logo;
