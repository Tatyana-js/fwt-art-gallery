type CloseListProps = {
  className?: string;
  onClick: () => void;
};

const GenresListButton: React.FC<CloseListProps> = ({ className, onClick }) => (
  <svg
    width="12"
    height="6"
    viewBox="0 0 12 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
  >
    <path d="M6 6L0.803848 0.75L11.1962 0.749999L6 6Z" fill="#9C9C9C" />
  </svg>
);

export default GenresListButton;
