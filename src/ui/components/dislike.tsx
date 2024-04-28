import { dislikeOffer } from "@/lib/actions";

export const Dislike = ({ offerId }: { offerId: number }) => {
  const dislikeOfferWithId = dislikeOffer.bind(null, offerId);
  return (
    <form className="offer--btn-dislike" action={dislikeOfferWithId}>
      <button>
        <span className="visually-hidden">No me gusta</span>
      </button>
    </form>
  );
};
