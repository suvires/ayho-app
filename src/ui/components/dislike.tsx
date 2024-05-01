export const Dislike = ({
  handleDislikeOffer,
}: {
  handleDislikeOffer: () => void;
}) => {
  return (
    <button className="offer--btn-dislike" onClick={handleDislikeOffer}>
      <span className="visually-hidden">No me gusta</span>
    </button>
  );
};
