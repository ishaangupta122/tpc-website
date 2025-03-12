const TruncateText = ({ text, maxLength = 100 }) => {
  return (
    <p>{text.length > maxLength ? text.slice(0, maxLength) + "..." : text}</p>
  );
};

export default TruncateText;
