import { Button, Table } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function BookList({ onBookClick, onBookCreate, outdatedFlag, onAuthorClick }) {
  const [books, setBooks] = useState([])

  useEffect(() => {
    getBooks()
  }, [outdatedFlag])

  const getBooks = async () => {
    const { data } = await axios({
      url: 'http://localhost:8080/books'
    })
    setBooks(data)
  }

  const deleteBook = async (bookID) => {
    await axios({
      method: 'delete',
      url: `http://localhost:8080/books/${bookID}`
    })
    getBooks()
  }

  return (
    <div>
      <Button onClick={() => { onBookCreate() }}>新建</Button>
      <Table
        dataSource={books}
        columns={[
          {
            title: '书籍名称',
            dataIndex: 'name',
            key: 'name',
            // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            render: (bookName, book, index) => <a onClick={() => { onBookClick(book.id) }}>{book.name}</a>
          },
          {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            render: (bookName, book, index) => <a onClick={() => { onAuthorClick(book.author.id) }}>{book.author.name}</a>
          },
          {
            title: 'action',
            dataIndex: 'delete',
            key: 'delete',
            align: 'right',
            render: (bookName, book, index) => <Button onClick={() => { deleteBook(book.id) }}>x</Button>
          }
        ]}
      />
    </div>
  )
}
