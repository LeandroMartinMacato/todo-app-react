import React from "react";

export default function Item(props) {
	// console.log(props);
	return (
		<div className="pb-1">
			<div className={`relative block mx-auto p-7 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
			${props.isDone ? "opacity-70" : ""}
			`}>
				<div onClick={props.deleteFunc} className="absolute right-1 top-1 text-lg">
					❌
				</div>
				<div className="flex justify-between mt-2">
					<h5 className={`mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white 
					${props.isDone ? "line-through" : ""}`}>
						{props.head}
					</h5>
					<h6 className={`text-gray-600 text-sm
					${props.isDone ? "line-through" : ""}`}>{props.date}</h6>
				</div>
				<p className={`text-left font-normal text-gray-700 dark:text-gray-400 
				${props.isDone ? "line-through" : "text-bold"}`}>
					{props.body}
				</p>
				<div className="text-right mt-5 max-w-sm">
					<button
						onClick={props.completeFunc}
						className="text-center text-indigo-400 rounded py-2 w-2/12 focus:outline-none bg-gray-900 border-2 border-indigo-400"
					>
						✅
					</button>
					<button
						onClick={props.openEditFunc}
						className="text-center text-indigo-400 rounded py-2 w-2/12 focus:outline-none bg-gray-900 border-2 border-indigo-400"
					>
						🖊️
					</button>
				</div>
			</div>
		</div>
	);
}
