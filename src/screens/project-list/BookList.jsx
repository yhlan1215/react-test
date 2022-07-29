import {Button, Table, Typography} from "antd";
import {useEffect,useState} from "react";
import axios from "axios";

export const BookList = ({onBookClick,onBookCreate,outdatedFlag}) => {
    const [books,setBooks] = useState([])

    useEffect (()=>{
        getBooks()
    },[outdatedFlag])

    const getBooks = async() => {
        const {data} = await axios({
            url:"http://localhost:8080/books"
        })
        setBooks(data)
    }

    const deleteBook = async(bookID) => {
        await axios({
            method:"delete",
            url:`http://localhost:8080/books/${bookID}`
        })
        getBooks()
    }
    return(
        <div>
            <Typography.Title>
                书籍列表
            </Typography.Title>
            <Button onClick={()=>{onBookCreate()}}>新建</Button>
            <Table
            dataSource={books} columns={[
                {   
                    title:"书名",
                    dataIndex:"name",
                    key:"name",
                    render:(bookName,book)=><a onClick={()=>{onBookClick(book.id)}}>{bookName}</a>
                },
                {
                    title:"作者",
                    dataIndex:"author",
                    key:"author",
                    render:(author)=>{return author.name} 
                },
                {
                    title:"",
                    dataIndex:"deleteBook",
                    key:"deleteBook",
                    render:(bookName,book)=><a onClick={()=>{deleteBook(book.id)}}>x</a>
                }
            ]}>
            </Table>
            </div>
    )
}