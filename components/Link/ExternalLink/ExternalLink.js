import styles from './ExternalLink.module.css';

const ExternalLink = ({ href, text, spaceBefore, spaceAfter }) => {
  const space = <> </>;
  const noSpace = <></>;

  /* If spaceBefore and spaceAfter attributes are defined, spaces are inserted before and after the HTMLLink element. */
  const addSpaceBefore = spaceBefore ? space : noSpace;
  const addSpaceAfter = spaceAfter ? space : noSpace;

  const HTMLLinkElement = (
    <>
      <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
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

export default ExternalLink;
