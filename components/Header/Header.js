import Logo from '../Logo/Logo';
import styles from './Header.module.css';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <Logo />
      </header>
    </>
  );
};

export default Header;
