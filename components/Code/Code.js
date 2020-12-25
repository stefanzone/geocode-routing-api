import styles from './Code.module.css';

const Code = ({ content, spaceBefore, spaceAfter }) => {
  const space = <> </>;
  const noSpace = <></>;

  /* If spaceBefore and spaceAfter attributes are defined, spaces are inserted before and after the Code element. */
  const addSpaceBefore = spaceBefore ? space : noSpace;
  const addSpaceAfter = spaceAfter ? space : noSpace;

  const CodeElement = (
    <>
      <code className={styles.code}>{content}</code>
    </>
  );

  return (
    <>
      {addSpaceBefore}
      {CodeElement}
      {addSpaceAfter}
    </>
  );
};

export default Code;
