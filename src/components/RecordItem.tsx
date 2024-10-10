import { Record } from "../types/weather";
import SearchIcon from "../assets/search.svg?react";
import TrashIcon from "../assets/trash.svg?react";

type Props = {
  item: Record;
  disabled: boolean;
  onSelect: () => void;
  onRemove: () => void;
};

const RecordItem = ({ item, disabled, onSelect, onRemove }: Props) => {
  return (
    <li key={item.id} className="record-item">
      <div className="record-item-info">
        <span>{item.name}</span>
        <span>{item.recordTime}</span>
      </div>
      <button disabled={disabled} className="action-btn" onClick={onSelect}>
        <SearchIcon />
      </button>
      <button disabled={disabled} className="action-btn" onClick={onRemove}>
        <TrashIcon />
      </button>
    </li>
  );
};

export default RecordItem;
