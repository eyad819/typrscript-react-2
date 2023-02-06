import { useRef } from "react";
import "./styles.css";
interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (eo: React.FormEvent) => void;
}
function InputFeild({ setTodo, todo, handleAdd }: props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(eo) => {
        handleAdd(eo);
        inputRef.current?.blur();
      }}
      className="input"
    >
      <input
        type="input"
        value={todo}
        onChange={(eo) => {
          setTodo(eo.target.value);
        }}
        placeholder="Enter a task"
        className="input__box"
      />
      <button type="submit" className="input_submit">
        GO
      </button>
    </form>
  );
}

export default InputFeild;
