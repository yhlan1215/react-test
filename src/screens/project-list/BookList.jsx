import { Button, Popover, Table } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

export function BookList() {
  const [books, setBooks] = useState([])
  const [allLength, setAllLength] = useState(0)
  const [language, setLanguage] = useState('')
  const [page, setPage] = useState(1)
  const nav = useNavigate()

  useEffect(() => {
    getBooks(page, language)
  }, [page])

  const getBooks = async (page, language) => {
    if (language === '') {
      const { data, headers } = await axios({
        url: `http://localhost:8080/books/?page=${page}&limit=5`
      })
      data.forEach((book) => { book.key = book.id })
      setBooks(data)
      setAllLength(parseInt(headers.length, 10))
    } else {
      const { data, headers } = await axios({
        url: `http://localhost:8080/books/?page=${page}&limit=5&language=${language}`
      })
      data.forEach((book) => { book.key = book.id })
      setBooks(data)
      setAllLength(parseInt(headers.length, 10))
    }
  }

  const deleteBook = async (bookId) => {
    await axios({
      method: 'delete',
      url: `http://localhost:8080/books/${bookId}`
    })
    getBooks()
  }

  const paginationProps = {
    defaultPageSize: 5,
    total: allLength
  }

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Popover content="新建书籍">
          <Button
            onClick={() => { nav('/BookList/newBook') }}
            style={{ marginBottom: '2vh' }}
          ><EditTwoTone />新建
          </Button>
        </Popover>
      </div>
      <div
        style={{ marginBottom: '2vh' }}
      >
        总计{allLength}本
      </div>
      <Table
        onChange={(pagination) => { setPage(pagination.current) }}
        pagination={paginationProps}
        dataSource={books}
        columns={[
          {
            title: '书籍名称',
            dataIndex: 'name',
            key: 'name',
            render: (bookName, book, index) => (
              <Popover content="详情">
                <Link to={`/BookList/${book.id}`}>{book.name}</Link>
              </Popover>
            ),
            filters: [
              {
                text: 'Chinese',
                value: 'Chinese'
              },
              {
                text: 'English',
                value: 'English'
              }
            ],
            onFilter: (value) => { setLanguage(value) }
          },
          {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            render: (author, book, index) => author.name
          },
          {
            title: 'action',
            dataIndex: 'delete',
            key: 'delete',
            align: 'right',
            render: (bookName, book, index) => (
              <Popover content="删除书籍">
                <Button onClick={() => { deleteBook(book.id) }}><DeleteTwoTone /></Button>
              </Popover>
            )
          }
        ]}
      />
    </div>
  )
}
