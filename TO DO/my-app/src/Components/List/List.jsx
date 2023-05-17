import React, { useRef, useState } from "react";
import "./List.css";
import { Button, InputGroup, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function List() {

    const inputRef = useRef(); // ref elem de entrada
    const [tareas, setTareas] = useState([]); // array tareas
    //useSatet funcion de react que establece estados y renderisa la pagina y se puede inicializar entre parentesis, no como el push 
    const [contador, setContador] = useState(0); // cont tareas

    function agregarToDo() {
        const contenido = inputRef.current.value // tomo el valor actual del input
        if(contenido !== "") {
        let nuevaTarea = {
            contenido: contenido,
            tachado: false
        }
        setTareas([...tareas, nuevaTarea]); //ref // operador spread - creo un nuevo array con la tarea existente + nueva tarea 
        inputRef.current.value = ""; //vacio input
        setContador(contador + 1);
    }};

    function tacharToDo(index) {
        const updateTareas = [...tareas]; // copio array tareas
        updateTareas[index].tachado = !updateTareas[index].tachado; // cambio estado tachado 
        setTareas(updateTareas); // actualizo estado del array

        const itemsTachados = updateTareas.filter((tarea) => tarea.tachado); //filtro las tareas tachadas
        setContador(tareas.length - itemsTachados.length); // actualizo estado contador sin las tareas tachadas
    };


    function eliminarTachados() {
        const tareasSinTachar = tareas.filter((tarea) => !tarea.tachado); // creo array filtrando las taras sin tachar
        setTareas(tareasSinTachar); // actualizo estado de las tareas

        // actualizo el contador de tareas
        const itemsTachados = tareasSinTachar.filter((tarea) => tarea.tachado); // creo array filtrando tareas tachadas al nuevo array
        setContador(tareasSinTachar.length - itemsTachados.length); // actualizo estado contenedor sin las taras sin tachar
    };



    return (
        <div>
            <h1>TO-DO LIST</h1>
            
            <InputGroup className="mb-3" id="input-group">
                <Form.Control
                    placeholder="Nueva Tarea" type="text" ref={inputRef} id="input"
                />
                <Button variant="outline-dark" id="button-addon2" onClick={agregarToDo}>
                    Agregar
                </Button>
            </InputGroup>

            <ul>
                {tareas.map((tarea, index) => (
                    <li key={index} onClick={() => tacharToDo(index)} id="tarea" className={tarea.tachado ? "tachado" : ""}>
                        {tarea.contenido}
                    </li>
                ))}
                {/* itera sobre el array de tareas */}
            </ul>

            <span>{contador} de {tareas.length} restantes </span>
            <Button variant="dark" onClick={eliminarTachados}>Eliminar Tachados</Button>

            {/* <footer>CG - Lourdes De Lucas</footer> */}

        </div>
        
    );
};

export default List;
