const todoInputElem = document.querySelector(".todo-input");
const todoListElem = document.querySelector(".todo-list");
const leftItemElem = document.querySelector(".item-counter");

let todos = [];
let id = 0;

const setTodos = (newTodos) => {
	todos = newTodos;
};

const getAllTodos = () => {
	return todos;
};

const appendTodos = (text) => {
	const newID = id++;
	const newTodos = getAllTodos().concat({ id: newID, content: text });

	setTodos(newTodos);
	setLeftItems();
	paintTodos();
};

const deleteTodo = (id) => {
	const newTodos = getAllTodos().filter((todo) => todo.id !== id);
	setTodos(newTodos);
	setLeftItems();
	paintTodos();
};

const editTodo = (e, id) => {
	const todoElem = e.target;
	const preText = todoElem.innerText;
	const todoItemElem = todoElem.parentNode;
	const inputElem = document.createElement("input");
	inputElem.value = preText;
	inputElem.classList.add("edit-input");

	inputElem.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			updateTodo(e.target.value, id);
		}
	});

	const onClickBody = (e) => {
		if (e.target !== inputElem) {
			todoItemElem.removeChild(inputElem);
			document.body.removeEventListener("click", onClickBody);
		}
	};

	document.body.addEventListener("click", onClickBody);
	todoItemElem.appendChild(inputElem);
};

const updateTodo = (text, id) => {
	const newTodos = getAllTodos().map((todo) =>
		todo.id === id ? { ...todo, content: text } : todo
	);
	setTodos(newTodos);
	paintTodos();
};

const paintTodos = () => {
	todoListElem.innerHTML = null;
	const allTodos = getAllTodos();

	allTodos.forEach((todo) => {
		const todoItemElem = document.createElement("li");
		todoItemElem.classList.add("todo-item");

		const todoElem = document.createElement("div");
		todoElem.classList.add("todo-content");
		todoElem.addEventListener("dblclick", (e) => editTodo(e, todo.id));
		todoElem.innerHTML = todo.content;

		const delBtnElem = document.createElement("button");
		delBtnElem.classList.add("delBtn");
		delBtnElem.addEventListener("click", () => deleteTodo(todo.id));
		delBtnElem.innerHTML = "X";

		todoItemElem.appendChild(todoElem);
		todoItemElem.appendChild(delBtnElem);

		todoListElem.appendChild(todoItemElem);
	});
};

const setLeftItems = () => {
	const todos = getAllTodos();
	console.log(todos);
	leftItemElem.innerHTML = `${todos.length} items left`;
};

const init = () => {
	todoInputElem.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			appendTodos(e.target.value);
			todoInputElem.value = "";
		}
	});
};

init();
