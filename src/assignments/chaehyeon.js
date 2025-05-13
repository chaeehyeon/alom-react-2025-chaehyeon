import { useState, useEffect } from "react";

function App() {
  // 과제1-1: 7-1, 7-2강을 듣고 이곳에 투두리스트 컴포넌트를 작성해주세요.
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);

  const onChange = (event) => setToDo(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo.trim() === "") {
      return;
    }
    const newToDos = [toDo.trim(), ...toDos];
    setToDos(newToDos);
    localStorage.setItem("savedToDos", JSON.stringify(newToDos));
    setToDo("");
  };

  const deleteToDo = (index) => {
    const newToDos = toDos.filter((_, i) => i !== index);
    setToDos(newToDos);
    localStorage.setItem("savedToDos", JSON.stringify(newToDos));
  };

  useEffect(() => {
    const saved = localStorage.getItem("savedToDos");
    if (saved) {
      setToDos(JSON.parse(saved));
    }
  }, []);

  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do..."
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => deleteToDo(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
