// import React from 'react'

// const App = () => {
//   return (
//     <div>App</div>
//   )
// }

// export default App

// frontend/src/App.js
import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:8080");

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();

    // Real-time listeners
    socket.on("bookAdded", (book) => setBooks((prev) => [...prev, book]));
    socket.on("bookUpdated", (updatedBook) =>
      setBooks((prev) =>
        prev.map((b) => (b._id === updatedBook._id ? updatedBook : b))
      )
    );
    socket.on("bookDeleted", (bookId) =>
      setBooks((prev) => prev.filter((b) => b._id !== bookId))
    );

    return () => {
      socket.off("bookAdded");
      socket.off("bookUpdated");
      socket.off("bookDeleted");
    };
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:8080/api/books");
    setBooks(res.data);
  };

  const addBook = async () => {
    await axios.post("http://localhost:8080/api/books", {
      title: "New Book",
      author: "Unknown",
    });
  };

  const updateBook = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/books/${id}`, {
      available: false,
    });
    } catch (error) {
      console.log(error)
    }
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:8080/api/books/${id}`);
  };

  return (
    <div>
      <h1>📚 Library Management</h1>
      <button onClick={addBook}>➕ Add Book</button>
      <ul>
        {books.map((b) => (
          <li key={b._id}>
            {b.title} - {b.author} ({b.available ? "✅ Available" : "❌ Borrowed"})
            <button onClick={() => updateBook(b._id)}>Update</button>
            <button onClick={() => deleteBook(b._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
