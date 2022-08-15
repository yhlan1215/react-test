import { Button, Popover, Table } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

export function BookList() {
  const [books, setBooks] = useState([])
  const [authors, setAuthors] = useState([])
  const [allLength, setAllLength] = useState(0)
  const [language, setLanguage] = useState([])
  const [category, setCategory] = useState([])
  const [isOld, setIsOld] = useState([])
  const [author, setAuthor] = useState([])
  const [page, setPage] = useState(1)
  const [field, setField] = useState('')
  const [order, setOrder] = useState('')
  const nav = useNavigate()

  useEffect(() => {
    getAuthors()
  }, [])

  useEffect(() => {
    getBooks()
  }, [page, language, category, isOld, author, field, order])

  const getBooks = async () => {
    let bookUrl = `http://localhost:8080/books/?page=${page}&limit=5`
    if (language && language.length) { bookUrl += `&language=${language.toString()}` }
    if (category && category.length) { bookUrl += `&category=${category.toString()}` }
    if (author && author.length) { bookUrl += `&author=${author.toString()}` }
    if (isOld && isOld.length) { bookUrl += `&isOld=${isOld.toString()}` }
    if (field) {
      if (order === 'ascend') {
        bookUrl += `&sort=-${field}`
      } else if (order === 'descend') {
        bookUrl += `&sort=${field}`
      }
    }
    const { data, headers } = await axios({
      url: bookUrl
    })
    data.forEach((book) => { book.key = book.id })
    setBooks(data)
    setAllLength(parseInt(headers.length, 10))
  }

  const deleteBook = async (bookId) => {
    await axios({
      method: 'delete',
      url: `http://localhost:8080/books/${bookId}`
    })
    getBooks()
  }

  const getAuthors = async () => {
    const { data } = await axios({
      url: 'http://localhost:8080/authors'
    })
    setAuthors(data)
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
        onChange={(pagination, filters, sorter) => {
          setPage(pagination.current)
          setLanguage(filters.language)
          setCategory(filters.category)
          setAuthor(filters.author)
          setIsOld(filters.isOld)
          setField(sorter.field)
          setOrder(sorter.order)
        }}
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
            sorter: true
          },
          {
            title: '新旧',
            dataIndex: 'isOld',
            key: 'isOld',
            render: (isOld, book, index) => {
              if (isOld === true) { return '旧' }
              return '新'
            },
            filters: [
              {
                text: '新',
                value: false
              },
              {
                text: '旧',
                value: true
              }
            ],
            sorter: true
          },
          {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            render: (author, book, index) => author.name,
            filters: authors.map((author) => ({
              text: author.name,
              value: author.id
            })),
            sorter: true
          },
          {
            title: '语言',
            dataIndex: 'language',
            key: 'language',
            render: (language, book, index) => {
              if (language === 'English') {
                return '英语'
              }
              return '中文'
            },
            filters: [
              {
                text: '中文',
                value: 'Chinese'
              },
              {
                text: '英语',
                value: 'English'
              }
            ],
            sorter: true
          },
          {
            title: '种类',
            dataIndex: 'category',
            key: 'category',
            render: (category, book, index) => {
              switch (category) {
                case 'fiction':
                  return '小说'
                case 'literature':
                  return '文学'
                case 'art':
                  return '艺术'
                case 'entertainment fashion':
                  return '娱乐时尚'
                case 'animation humor':
                  return '动画幽默'
                case 'tourism':
                  return '旅游'
                case 'map geography':
                  return '地图地理'
                default:
                  return '不知道'
              }
            },
            filters: [
              {
                text: '小说',
                value: 'fiction'
              },
              {
                text: '文学',
                value: 'literature'
              },
              {
                text: '艺术',
                value: 'art'
              },
              {
                text: '动画幽默',
                value: 'animation humor'
              },
              {
                text: '娱乐时尚',
                value: 'entertainment fashion'
              },
              {
                text: '旅游',
                value: 'tourism'
              },
              {
                text: '地图地理',
                value: 'map geography'
              }
            ],
            sorter: true
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
