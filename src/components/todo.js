import React from "react";
import Item from "./item";
import Modal from "react-modal";

const customStyles = {
	content: {
		display: "flex",
		flexDirection: "column",
		bottom: "auto",
		maxwidth: "400px",
	},
};

Modal.setAppElement("#root");

export default function Todo() {
	/* --------------------------- STATES & VARIABLES --------------------------- */

	let subtitle;
	const [modalTitle, setModalTitle] = React.useState("Create To-Do item");
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [isCreating , setIsCreating] = React.useState(false);
	const [isEditing , setIsEditing] = React.useState(false);
	const [currEdit, setCurrEdit] = React.useState(""); // curr item getting edited
	const [formData, setFormData] = React.useState({
		header: "",
		body: "",
	});
	const [todoArray, setTodoArray] = React.useState([
		{
			id:"0",
			isDone: false,
			head: "Finish React To-do-App",
			body: "Add all features and functionalities from adding ,deleting ,editing and finishing tasks.",
			dateCreated: "2022-7-28-14:20:30",
		},
	]);

	/* ----------------------------- STATE FUNCTIONS ---------------------------- */
	function openAddTodo() {
		setIsCreating(true);
		setModalTitle("Create To-Do item");
		openModal();
	}

	function addTodo(formData) {
		console.log("Add Custom Todo");
		console.log(formData);
		setModalTitle("Create To-Do item");
		let date = new Date();
		let current_date =
			date.getFullYear() +
			"-" +
			date.getMonth() +
			"-" +
			date.getDate() +
			"-" +
			date.getHours() +
			":" +
			date.getMinutes() +
			":" +
			date.getSeconds();
		setTodoArray((prevTodos) => {
			const newTodos = [...prevTodos];
			newTodos.push({
				id: `${todoArray.length + 1}`,
				isDone: false,
				head: `${formData.header}`,
				body: `${formData.body}`,
				dateCreated: `${current_date}`,
			});
			return newTodos;
		});
		closeModal();
	}

	function completeTodo(id) {
		console.log("Pressed Check Button");
		setTodoArray((prevTodos) => {
			return prevTodos.map((todo) => {
				return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
			});
		});
	}

	function deleteTodo(id) {
		console.log("Pressed Delete Button");
		setTodoArray((prevTodos) => {
			return prevTodos.filter((todo) => {
				return todo.id !== id;
			});
		});
	}

	function editTodo(event) {
		event.preventDefault();
		console.log("edited a todo item");
		setTodoArray((prevTodos) => {
			return prevTodos.map((todo) => {
				return todo.id === currEdit
					? {
							...todo,
							head: `${formData.header}`,
							body: `${formData.body}`,
					  }
					: todo;
			});
		});
		setFormData({ header: "", body: "" });
		closeModal();
	}

	function openEditTodo(id) {
		setModalTitle("Edit To-do");
		setIsEditing(true);
		setCurrEdit(id);
		console.log("Editing Todo");
		openModal();
	}

	function clearTodo() {
		setTodoArray([]);
	}

	//Modals
	function openModal(id) {
		setIsOpen(true);
	}

	function afterOpenModal() {
		subtitle.style.color = "black";
	}

	function closeModal() {
		setIsCreating(false);
		setIsEditing(false);
		setIsOpen(false);
	}

	function handleChange(event) {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[event.target.name]: event.target.value,
			};
		});
		// console.log(formData);
	}

	function handleCreate(event) {
		event.preventDefault();
		addTodo(formData);
		setFormData({ header: "", body: "" });
	}

	/* ---------------------------- ELEMENT RENDERING --------------------------- */
	const todoElements = todoArray.map((todo) => {
		const { id, head, body, dateCreated, isDone } = todo;
		return (
			<Item
				key={id}
				isDone={isDone}
				head={head}
				body={body}
				date={dateCreated}
				completeFunc={() => completeTodo(todo.id)}
				deleteFunc={() => deleteTodo(todo.id)}
				openEditFunc={() => openEditTodo(todo.id)}
			/>
		);
	});

	/* -------------------------------- COMPONENT ------------------------------- */
	return (
		<div>
			{/* ------------------------------- Todo Items ------------------------------- */}
			{todoElements.length === 0 && <p> Empty To-do List</p>}
			{todoElements}
			{/* -------------------------------            ------------------------------- */}
			<button
				onClick={openAddTodo}
				className="text-center text-indigo-400 font-bold rounded mx-3 my-4 py-2  md:w-2/12 px-5 focus:outline-none bg-gray-900 border-2 border-indigo-400"
			>
				Create 📓 
			</button>
			{todoElements.length > 0 && (
				<button
					onClick={clearTodo}
					className="text-center text-indigo-400 font-bold rounded mx-3 my-4 py-2  md:w-2/12 px-5 focus:outline-none bg-gray-900 border-2 border-indigo-400"
				>
					Clear 🧹 
				</button>
			)}
			{/* -------------------------------- GO MODAL ------------------------------- */}
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div className="flex justify-between">
					<h2
						className="text-lg font-bold"
						ref={(_subtitle) => (subtitle = _subtitle)}
					>
						{modalTitle}
					</h2>
					<button onClick={closeModal}>❌</button>
				</div>
				<form>
					<div>
						<label
							htmlFor="Header"
							className="block text-sm font-medium text-gray-700"
						>
							{" "}
							Header{" "}
						</label>
						<div className="mt-1">
							<input
								type="text"
								onChange={handleChange}
								value={formData.header}
								name="header"
								className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
							/>
						</div>
						<label
							htmlFor="Body"
							className="block text-sm font-medium text-gray-700"
						>
							{" "}
							Body{" "}
						</label>
						<div className="mt-1">
							<textarea
								id="about"
								onChange={handleChange}
								value={formData.body}
								name="body"
								rows="3"
								className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
							></textarea>
						</div>
					</div>
					<div className="text-right">
						{isCreating && 
							<button
								onClick={handleCreate}
								className="text-center text-indigo-400 rounded py-2  mt-2 w-6/12  focus:outline-none bg-gray-900 border-2 border-indigo-400"
							>
								Create
							</button>
						}
						{isEditing &&
							<button
								onClick={editTodo}
								className="text-center text-indigo-400 rounded py-2  mt-2 w-6/12  focus:outline-none bg-gray-900 border-2 border-indigo-400"
							>
								Edit
							</button>
						
						}
					</div>
				</form>
			</Modal>
			{/* -------------------------------- END MODAL ------------------------------- */}
		</div>
	);
}
