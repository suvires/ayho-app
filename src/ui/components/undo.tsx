import { undo } from "@/lib/actions";

export const Undo = () => {
  return (
    <form className="offer--btn-undo" action={undo}>
      <button>
        <span className="visually-hidden">Deshacer</span>
      </button>
    </form>
  );
};
