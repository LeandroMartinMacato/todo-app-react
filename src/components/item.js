import React from "react";

export default function Item(props) {
	// console.log(props);
	return (
		<div>
			<div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
				<div className="flex justify-between">
					<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
						{props.head}
					</h5>
					<h6 className="text-gray-600 text-sm">{props.date}</h6>
				</div>
				<p className="font-normal text-gray-700 dark:text-gray-400">
					{props.body}
				</p>
				<div className="flex justify-between">
					<h6>{props.isDone ? "Done 😎" : "Undone 😢"}</h6>
				</div>
				<div className="text-right">
					<button
						onClick={props.completeFunc}
						className="text-center text-indigo-400 rounded py-2 w-2/12 focus:outline-none bg-gray-900 border-2 border-indigo-400"
					>
						✅
					</button>
					<button
						onClick={props.deleteFunc}
						className="text-center text-indigo-400 rounded py-2 w-2/12 focus:outline-none bg-gray-900 border-2 border-indigo-400"
					>
						❌
					</button>
					<button
						onClick={props.editFunc}
						className="text-center text-indigo-400 rounded py-2 w-2/12 focus:outline-none bg-gray-900 border-2 border-indigo-400"
					>
						🖊️
					</button>
				</div>
			</div>
		</div>
	);
}
