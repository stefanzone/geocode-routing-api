import Link from 'next/link';

import styles from './InternalLink.module.css';

const InternalLink = ({ href, text, spaceBefore, spaceAfter }) => {
  const space = <> </>;
  const noSpace = <></>;

  /* If spaceBefore and spaceAfter attributes are defined, spaces are inserted before and after the HTMLLink element. */
  const addSpaceBefore = spaceBefore ? space : noSpace;
  const addSpaceAfter = spaceAfter ? space : noSpace;

  const HTMLLinkElement = (
    <>
      <Link href={href}>
        <a className={styles.link}>{text}</a>
      </Link>
    </>
  );

  return (
    <>
      {addSpaceBefore}
      {HTMLLinkElement}
      {addSpaceAfter}
    </>
  );
};

export default InternalLink;
