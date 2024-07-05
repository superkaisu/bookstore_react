import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'


function AddBook(props) {
    const [open, setOpen] = useState(false);
    const [newBook, setNewBook] = useState({
        author: '',
        isbn: '',
        price: '',
        title: '',
        year: '',
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (e) => {
        setNewBook({
            ...newBook,
            [e.target.name]: e.target.value
        });
    }

    const hadleSave = () => {
        props.addBook(newBook);
        handleClose();
    }

    return (
        <>
        <Button variant="outlined" onClick={handleOpen}>Add Book</Button>
        <Dialog open={open}>
            <DialogTitle>New Book</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="author"
                    value={newBook.author}
                    label="Author"
                    fullWidth
                    onChange={inputChanged}
                />
                <TextField
                    margin="dense"
                    name="isbn"
                    value={newBook.isbn}
                    label="ISBN"
                    fullWidth
                    onChange={inputChanged}
                />
                <TextField
                    margin="dense"
                    name="price"
                    value={newBook.price}
                    label="Price"
                    fullWidth
                    onChange={inputChanged}
                />
                <TextField
                    margin="dense"
                    name="title"
                    value={newBook.title}
                    label="Title"
                    fullWidth
                    onChange={inputChanged}
                />
                <TextField
                    margin="dense"
                    name="year"
                    value={newBook.year}
                    label="Year"
                    fullWidth
                    onChange={inputChanged}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={hadleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    )

}
export default AddBook;