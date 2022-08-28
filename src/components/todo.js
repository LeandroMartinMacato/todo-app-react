import React from "react";
import Item from "./item"
import Modal from 'react-modal';

const customStyles = {
content: {
	top: '50%',
	left: '50%',
	right: 'auto',
	bottom: 'auto',
	marginRight: '-50%',
	transform: 'translate(-50%, -50%)',
},
};

Modal.setAppElement('#root');

export default function Todo() {
	/* --------------------------- STATES & VARIABLES --------------------------- */

	let subtitle;
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [formData , setFormData] = React.useState({
		header: "",
		body: ""
	})
	const [todoArray, setTodoArray] = React.useState([
	{
		id: "1",
		isDone: false,
		head: "Finish React To-do-App",
		body: "Add all features add,delete,edit,finish",
		dateCreated: "3/14/2015",
	}
]);

	/* ----------------------------- STATE FUNCTIONS ---------------------------- */
	function testAddTodo(){
		console.log("TEST: Add todo button")
		setTodoArray(prevTodos =>{
			const newTodos = [...prevTodos]
			newTodos.push({
				id:`${todoArray.length + 1}`,
				isDone: false,
				head: "Walk the dog",
				body: "I will be walking the dog tommorow",
				dateCreated: "1/12/2014"
			})
			return newTodos;
		})
	}


	function addTodo(formData){
		console.log("Add Custom Todo");
		console.log(formData);
		let date = new Date();
		let current_date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		setTodoArray(prevTodos =>{
			const newTodos = [...prevTodos]
			newTodos.push({
				id: `${todoArray.length + 1}`,
				isDone: false,
				head: `${formData.header}`,
				body: `${formData.body}`,
				dateCreated:`${current_date}` 
			})
			return newTodos;
		})
	}

	function completeTodo(id){
		console.log("Pressed Check Button");
		setTodoArray(prevTodos =>{
			return prevTodos.map((todo) => {
				return todo.id === id ? {...todo , isDone: !todo.isDone} : todo 
			})
		})
	}

	function deleteTodo(id){
		console.log("Pressed Delete Button");
		setTodoArray(prevTodos => {
			return prevTodos.filter(todo => {
				return todo.id !== id;
			})
		})

	}

	//Modals
	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = '#f00';
	}

	function closeModal() {
		setIsOpen(false);
	}

	function handleChange(event){
		setFormData(prevFormData => {
			return {
				...prevFormData,
				[event.target.name]: event.target.value
			}
		})
		console.log(formData);
	}

	function handleSubmit(event){
		event.preventDefault()
		addTodo(formData)
		setFormData({header: "" , body: ""})
	}

	/* ---------------------------- ELEMENT RENDERING --------------------------- */
	const todoElements = todoArray.map(todo => {
		const {id , head , body , dateCreated ,isDone} = todo
		return (<Item key={id} isDone={isDone} head={head} body={body} date={dateCreated} completeFunc={() => completeTodo(todo.id)} deleteFunc={() => deleteTodo(todo.id)}/>)
	})

	/* -------------------------------- COMPONENT ------------------------------- */
	return (
		<div>
			{/* ------------------------------- Todo Items ------------------------------- */}
            {todoElements}
			{/* -------------------------------            ------------------------------- */}
			<button onClick={testAddTodo} className="text-center text-indigo-400 font-bold rounded my-4 py-2 w-4/12 focus:outline-none bg-gray-900 border-2 border-indigo-400">DEBUG: +1todo</button>

		<button onClick={openModal} className="text-center text-indigo-400 font-bold rounded my-4 py-2 w-4/12 focus:outline-none bg-gray-900 border-2 border-indigo-400">Create to-do</button>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div className="flex justify-between">
					<h2 className="text-lg font-bold" ref={(_subtitle) => (subtitle = _subtitle)}>Create To-Do item</h2>
					<button onClick={closeModal}>❌</button>
				</div>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="Header" className="block text-sm font-medium text-gray-700"> Header </label>
						<div className="mt-1">
							<input type="text" onChange={handleChange} value={formData.header} name="header" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
							/>
						</div>
						<label htmlFor="Body" className="block text-sm font-medium text-gray-700"> Body </label>
						<div className="mt-1">
							<textarea id="about" onChange={handleChange} value={formData.body} name="body" rows="3" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
						</div>
					</div>
					<div className="text-right">
						<button className="text-center text-indigo-400 rounded py-2  mt-2 w-6/12  focus:outline-none bg-gray-900 border-2 border-indigo-400">Create</button>
					</div>
				</form>
			</Modal>
		</div>
	);
}
