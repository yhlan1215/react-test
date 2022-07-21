import axios from "axios";
import { useEffect,useState } from "react";

export const BookList = ({outdatedFlag, onBookClick,onBookCreate}) => {
    const[books,setBooks]=useState([])
    useEffect(()=>{
        getBooks()
    },[outdatedFlag])

    const getBooks = async() => {
        const{data}=
         await axios({
             url:"http://localhost:8080/books"
         })
         setBooks(data)
    }

    const deleteOneBook = async(id) => {
        await axios({
            method:'delete',
            url:`http://localhost:8080/books/${id}`
        })
        getBooks()
    }

return (
<table border="1">
    <thead>
<button onClick={()=>onBookCreate()}>新建</button>
    <tr>
        <th>书名</th>
        <th></th>
        <th></th>
    </tr>

    </thead>
    <tbody>
    {books.map((book)=>(
    <tr key={book.id}>
        <td>{book.name}</td>
        <td><button onClick={()=>onBookClick(book.id)}>详情</button></td>
        <td><button onClick={()=>deleteOneBook(book.id)}>x</button></td>
     </tr>))}   
     </tbody>
</table>
)
}