import axios from "axios"
import { useEffect,useState } from "react"

export const BookList = ({onBookClick,onBookCreate,outdatedFlag}) => {
    const [books,setBooks] = useState([])
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

    const deleteBook = async(id) => {
        await axios({
            method:"delete",
            url:`http://localhost:8080/books/${id}`
        })
        getBooks()
    }

    return(
        <table border="9">
            <thead>
                <button onClick={()=>{onBookCreate()}}>新建</button>
                <tr>
                    <th>书籍列表</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {books.map((book)=><tr>
                    <td>{book.name}</td>
                    <td><button onClick={() => {deleteBook(book.id)}}>x</button></td>
                    <td><button onClick={() => {onBookClick(book.id)}}>详情</button></td>
                </tr>)}
            </tbody>
        </table>
    )
}