export const Undo = ({ handleUndo }: { handleUndo: () => void }) => {
  return (
    <button className="offer--btn-undo" onClick={handleUndo}>
      <span className="visually-hidden">Deshacer</span>
    </button>
  );
};
