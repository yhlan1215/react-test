import axios from "axios"
import { useEffect,useState } from "react"
import {Button,Table, Typography} from "antd"
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'

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
        <div> 
            <Typography.Title>
                书籍列表
            </Typography.Title>
            <Button icon={<EditOutlined /> } onClick={onBookCreate}>新建</Button>
            <Table dataSource={books} columns = {[
                    {
                    title: '书名',
                    dataIndex: 'name',
                    key: 'name',
                    render: (bookName,book,index)=> <a onClick={() => {onBookClick(books.find((book)=>book.name===bookName).id)}}>{bookName}</a>,
                },
                {
                    title: '价格',
                    dataIndex: 'price',
                    key: 'price',
                },
                {
                    title: '作者',
                    dataIndex: 'author',
                    key: 'author',
                    render:(author)=>{return author.name}
                },
                {
                    align:'right',
                    title: 'Action',
                    dataIndex: '',
                    key: 'x',
                    render:(bookName,book,index)=>  <a onClick={()=>{deleteBook(book.id)}}><DeleteOutlined /></a>,
                },
                ]}>
            </Table>
        </div>
    )
}