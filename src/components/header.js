import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
	return (
		<div className="Header flex justify-center items-center my-2.5 rounded">
			<h1 className="Title text-4xl font-sans font-bold"> To-Do-App</h1>
			<FontAwesomeIcon className="text-4xl ml-4" icon={faFeather} />
		</div>
	);
}
