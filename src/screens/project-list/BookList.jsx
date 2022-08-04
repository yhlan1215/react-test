import { Button, Popover, Table } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

export function BookList() {
  const [books, setBooks] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    getBooks()
  }, [])

  const getBooks = async () => {
    const { data } = await axios({
      url: 'http://localhost:8080/books'
    })
    setBooks(data)
  }

  const deleteBook = async (bookId) => {
    await axios({
      method: 'delete',
      url: `http://localhost:8080/books/${bookId}`
    })
    getBooks()
  }

  return (
    <div>
      <Popover content="新建书籍">
        <Button onClick={() => { nav('/BookList/newBook') }}><EditTwoTone />新建</Button>
      </Popover>
      <Table
        dataSource={books}
        columns={[
          {
            title: '书籍名称',
            dataIndex: 'name',
            key: 'name',
            // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            render: (bookName, book, index) => <Link to={`/BookList/${book.id}`}>{book.name}</Link>
          },
          {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            render: (author, book, index) => author.name
          },
          {
            title: 'action',
            dataIndex: 'delete',
            key: 'delete',
            align: 'right',
            render: (bookName, book, index) => <Popover content="删除书籍"><Button onClick={() => { deleteBook(book.id) }}><DeleteTwoTone /></Button></Popover>
          }
        ]}
      />
    </div>
  )
}
