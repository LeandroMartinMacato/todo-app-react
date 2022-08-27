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
		id: "" ,
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
	},
	// {
	// 	id: "2",
	// 	head: "Start Django",
	// 	body: "Learn Django create social media",
	// 	dateCreated: "3/14/2015",
	// },
]);

	/* ----------------------------- STATE FUNCTIONS ---------------------------- */
	function testAddTodo(){
		console.log("TEST: Add todo button")
		setTodoArray(prevTodos =>{
			const newTodos = [...prevTodos]
			newTodos.push({
				id: "69",
				isDone: false,
				head: "Walk the dog",
				body: "I will be walking the dog tommorow",
				dateCreated: "1/12/2014"
			})
			return newTodos;
		})
	}

	function addTodo(){
		console.log("TEST: Add todo button")
		setTodoArray(prevTodos =>{
			const newTodos = [...prevTodos]
			newTodos.push({
				id: "69",
				isDone: false,
				head: "Walk the dog",
				body: "I will be walking the dog tommorow",
				dateCreated: "1/12/2014"
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

	/* ---------------------------- ELEMENT RENDERING --------------------------- */
	const todoElements = todoArray.map(todo => {
		const {id , head , body , dateCreated ,isDone} = todo
		return (<Item key={id} isDone={isDone} head={head} body={body} date={dateCreated} completeFunc={() => completeTodo(todo.id)} deleteFunc={() => deleteTodo(todo.id)}/>)
	})

	/* -------------------------------- COMPONENT ------------------------------- */
	return (
		<div>
            {todoElements}
			<button onClick={testAddTodo} className="text-center text-indigo-400 font-bold rounded my-4 py-2 w-4/12 focus:outline-none bg-gray-900 border-2 border-indigo-400">Add To-Do</button>

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
				<form>
					<div>
						<label for="Header" class="block text-sm font-medium text-gray-700"> Header </label>
						<div class="mt-1">
							<input type="text" onChange={handleChange} value={formData.header} name="header" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
							/>
						</div>
						<label for="Body" class="block text-sm font-medium text-gray-700"> Body </label>
						<div class="mt-1">
							<textarea id="about" onChange={handleChange} value={formData.body} name="body" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
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
