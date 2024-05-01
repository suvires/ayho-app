export const Like = ({ handleLikeOffer }: { handleLikeOffer: () => void }) => {
  return (
    <button className="offer--btn-like" onClick={handleLikeOffer}>
      <span className="visually-hidden">Me gusta</span>
    </button>
  );
};
