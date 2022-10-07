import React, { useState } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface Itask {
  title: string;
  description: string;
}

function App() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tasks, setTasks] = useState<Itask[]>([]); //si pusieramos solo Itask se esperaria UN objeto, en cambio agregando el array, espera multiples Itasks

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (e.target.title && e.target.description) {
      const titleInput: string = e.target.title.value;
      const descriptionInput: string = e.target.description.value;
      setTasks([
        ...tasks,
        { title: titleInput, description: descriptionInput },
      ]);
      setTitle("");
      setDescription("");
      console.log(tasks);
    }
  };

  const handleDelete = (e: any) => {
    const index = e.target.attributes.getNamedItem("data-index").value;
    let newArray = [...tasks];
    newArray.splice(index, 1);
    setTasks(newArray);
  };

  return (
    <>
      <h1>Tasks App</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <h2>Ingrese sus tareas</h2>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          required
        />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          value={description}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      <h2>Sus tareas</h2>
      <ul>
        {tasks?.map((item: Itask, i: number) => {
          return (
            <li key={i}>
              <b>{item.title}</b>
              <br />
              {item.description}
              <button data-index={i} onClick={handleDelete}>
                X
              </button>{" "}
              {/*agregar el "data-" antes de el valor, permite agregar atributos personalizados */}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
