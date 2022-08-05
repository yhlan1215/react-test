import axios from 'axios'
import { useEffect, useState } from 'react'
import { Table } from 'antd'
import { useParams } from 'react-router-dom'

export function BookStoreDetail() {
  const [bookStore, setBookStore] = useState()
  const [books, setBooks] = useState([])
  const { bookStoreId } = useParams()

  useEffect(() => {
    getBooks()
  }, [])

  useEffect(() => {
    getBookStore(bookStoreId)
  }, [])

  const getBooks = async () => {
    const { data } = await axios({
      url: 'http://localhost:8080/books'
    })
    setBooks(data)
  }

  const getBookStore = async (bookStoreId) => {
    const { data } = await axios({
      url: `http://localhost:8080/bookstores/${bookStoreId}`
    })
    const arr = data.books
    for (let i = 0; i < arr.length; i++) {
      const book = books.find((book) => arr[i].book === book.id)
      arr[i].book = book.name
    }
    setBookStore(arr)
  }

  return (
    <Table
      dataSource={bookStore}
      columns={[
        {
          title: '书籍',
          dataIndex: 'book',
          key: 'book'
        },
        {
          title: '数量',
          dataIndex: 'theNumberOfBooks',
          key: 'theNumberOfBooks'
        }
      ]}
    />
  )
}
