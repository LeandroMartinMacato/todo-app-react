import React from "react";
import Item from "./item"

export default function Todo() {
	// const [todoArray, setTodoArray] = React.useState([]);
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

	function addTodo(){
		console.log("button pressed")
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
		console.log(todoArray);
	}

	const todoElements = todoArray.map(todo => {
		const {id , head , body , dateCreated ,isDone} = todo
		return (<Item key={id} isDone={isDone} head={head} body={body} date={dateCreated}/>)
	})

	return (
		<div>
            {todoElements}
			<button onClick={addTodo} className="text-center text-indigo-400 font-bold rounded my-4 py-2 w-4/12 focus:outline-none bg-gray-900 border-2 border-indigo-400">Add To-Do</button>
		</div>
	);
}
