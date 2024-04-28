import { likeOffer } from "@/lib/actions";

export const Like = ({ offerId }: { offerId: number }) => {
  const likeOfferWithId = likeOffer.bind(null, offerId);
  return (
    <form className="offer--btn-like" action={likeOfferWithId}>
      <button>
        <span className="visually-hidden">Me gusta</span>
      </button>
    </form>
  );
};
