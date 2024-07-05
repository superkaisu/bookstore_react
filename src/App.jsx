import { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import DeleteIcon from '@mui/icons-material/Delete';
import AddBook from './AddBook'
import './App.css';

function App() {

  const [books, setBooks] = useState([]);

  const columnDefs = [
    { field: "author", sortable: true, filter: true },
    { field: "isbn", sortable: true, filter: true },
    { field: "price", sortable: true, filter: true },
    { field: "title", sortable: true, filter: true },
    { field: "year", sortable: true, filter: true },
    {
      headerName: '',
      width: 90,
      cellRenderer: params =>
        <IconButton onClick={() => deleteBook(params.data.id)} size="small" color="error">
          <DeleteIcon />
        </IconButton>
      }
  ];

  // Fetch the data from the database
  useEffect(() => {
    fetchBooks();
  }, []);

  // async function fetchBooks() {
  //   try {
  //     const response = await fetch('https://bookstore-67b8f-default-rtdb.europe-west1.firebasedatabase.app/.json');   
  //     const json = await response.json();
  //     console.log(json);
  //     setBooks(Object.values(json));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const fetchBooks = () => {
    fetch('https://bookstore-67b8f-default-rtdb.europe-west1.firebasedatabase.app/books/.json')
      .then(response => response.json())
      .then(data => addKeys(data))
      //.then(data => setBooks(Object.values(data)))
      .catch(err => console.error(err))
  }

  // adding keys to the data
  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) => 
      Object.defineProperty(item, 'id', { value: keys[index] }));
      setBooks(valueKeys);
  }

  const addBook = (newBook) => {
    fetch('https://bookstore-67b8f-default-rtdb.europe-west1.firebasedatabase.app/books/.json',
      {
        method: 'POST',
        body: JSON.stringify(newBook),
      })

      .then(response => fetchBooks())
      .catch(err => console.error(err))
  }


  const deleteBook = (id) => {
    console.log(id);
    fetch(`https://bookstore-67b8f-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
      {
        method: 'DELETE',
      })
      .then(response => fetchBooks())
      .catch(err => console.error(err))
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            Bookstore
          </Typography>
        </Toolbar>
      </AppBar>
      <AddBook addBook={addBook}/>
      <div className="ag-theme-material" style={{ height: 400, width: 1000 }}>
        <AgGridReact
          rowData={books}
          columnDefs={columnDefs}
        />
      </div>
    </>
  );
}

export default App
