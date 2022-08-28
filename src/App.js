import React from 'react';
import './App.css';
import Header from './components/header';
import Todo from './components/todo';

export default function App() {


  return (
    <div className="App text-white font-mono">
        <Header />
        <Todo />
    </div>
  )
}