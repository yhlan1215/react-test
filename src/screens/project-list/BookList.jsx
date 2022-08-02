import { Button, Popover, Table } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons'

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
      <Popover content="新建书籍">
        <Button onClick={() => { onBookCreate() }}><EditTwoTone />新建</Button>
      </Popover>
      <Table
        dataSource={books}
        columns={[
          {
            title: '书籍名称',
            dataIndex: 'name',
            key: 'name',
            // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            render: (bookName, book, index) => <Popover content="书籍详情"> <a onClick={() => { onBookClick(book.id) }}>{book.name}</a></Popover>
          },
          {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            render: (bookName, book, index) => <Popover content="作者详情"><a onClick={() => { onAuthorClick(book.author.id) }}>{book.author.name}</a></Popover>
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
