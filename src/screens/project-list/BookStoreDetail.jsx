import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Button, Form, InputNumber, message, Modal, Popover, Select, Table } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { EditTwoTone, DeleteTwoTone, RollbackOutlined } from '@ant-design/icons'
import { clone } from './utils'

export function BookStoreDetail() {
  const [bookIndexes, setBookIndexes] = useState([])
  const [books, setBooks] = useState([])
  const { bookStoreId } = useParams()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [allLength, setAllLength] = useState(0)
  const [page, setPage] = useState(1)
  const [allBookIndexes, setAllBookIndexes] = useState([])
  const [field, setField] = useState('')
  const [order, setOrder] = useState('')
  const { Option } = Select
  const formRef = useRef()
  const nav = useNavigate()

  useEffect(() => {
    getBooks()
    getAllBookIndexes()
  }, [])

  useEffect(() => {
    if (bookStoreId) {
      getBookIndexes(bookStoreId, page)
    }
  }, [bookStoreId, page, field, order])

  useEffect(() => {
    if (isModalVisible === true) {
      const newBookIndex = {
        book: '',
        theNumberOfBooks: 0
      }
      formRef.current.setFieldsValue(newBookIndex)
    }
  }, [isModalVisible])

  const getBooks = async () => {
    const { data } = await axios({
      url: 'http://localhost:8080/books'
    })
    setBooks(data)
  }

  const getAllBookIndexes = async () => {
    const { data } = await axios({
      url: `http://localhost:8080/bookindexes?bookStore=${bookStoreId}`
    })
    setAllBookIndexes(data)
  }

  const getBookIndexes = async (bookStoreId, page) => {
    let bookIndexUrl = `http://localhost:8080/bookindexes?bookStore=${bookStoreId}&page=${page}&limit=5`
    if (field) {
      if (order === 'ascend') {
        bookIndexUrl += `&sort=-${field}`
      } else if (order === 'descend') {
        bookIndexUrl += `&sort=${field}`
      }
    }
    const { data, headers } = await axios({
      url: bookIndexUrl
    })
    data.forEach((bookIndex) => {
      bookIndex.buttonDisabled = false
      bookIndex.key = bookIndex.id
    })
    setBookIndexes(data)
    setAllLength(parseInt(headers.length, 10))
  }

  const plusOne = async (bookIndexId) => {
    await axios({
      method: 'put',
      url: `http://localhost:8080/bookindexes/${bookIndexId}/plus`
    })
    getBookIndexes(bookStoreId, page)
  }

  const minusOne = async (bookIndexId) => {
    await axios({
      method: 'put',
      url: `http://localhost:8080/bookindexes/${bookIndexId}/minus`
    })
    getBookIndexes(bookStoreId, page)
  }

  const deleteBookIndex = async (bookIndexId) => {
    await axios({
      method: 'delete',
      url: `http://localhost:8080/bookindexes/${bookIndexId}`
    })
  }

  const openModal = () => {
    setIsModalVisible(true)
  }

  const addBook = async (bookIndex) => {
    await axios({
      method: 'post',
      url: 'http://localhost:8080/bookindexes',
      data: bookIndex
    })
    setIsModalVisible(false)
    getBookIndexes(bookStoreId, page)
  }

  const onSave = () => {
    formRef.current.validateFields()
      .then((bookIndex) => {
        bookIndex.bookStore = bookStoreId
        addBook(bookIndex)
      })
    message.success('保存成功')
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const paginationProps = {
    total: allLength,
    defaultPageSize: 5
  }

  if (!bookIndexes) {
    return null
  } return (
    <div>
      <div>
        <Button onClick={() => { nav('/BookStoreList') }}><RollbackOutlined /></Button>
      </div>
      <div>
        总计{allLength}本
      </div>
      <div style={{ textAlign: 'right' }}>
        <Popover content="添加书籍">
          <Button onClick={openModal}><EditTwoTone />添加</Button>
        </Popover>
      </div>
      <div>
        <Modal
          title="添加书籍"
          visible={isModalVisible}
          onOk={onSave}
          onCancel={handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <Form ref={formRef}>
            <Form.Item
              label="书籍"
              name="book"
              key="book"
            >
              <Select>
                {books.filter((book) => !allBookIndexes.filter((bookIndex) => bookIndex.book === book.id).length)
                  .map((book) => <Option value={book.id} key={book.id}>{book.name}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item
              label="数量"
              name="theNumberOfBooks"
              key="theNumberOfBooks"
            >
              <InputNumber addonAfter="本" min="1" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Table
        pagination={paginationProps}
        onChange={(pagination, filters, sorter) => {
          setPage(pagination.current)
          setField(sorter.field)
          setOrder(sorter.order)
        }}
        dataSource={bookIndexes}
        columns={[
          {
            title: '书籍',
            dataIndex: 'book',
            key: 'book',
            render: (bookId, book, index) => (
              books.find(
                (book) => book.id === bookId
              ) ? books.find((book) => book.id === bookId).name : '找不到'),
            sorter: true
          },
          {
            title: '数量',
            dataIndex: 'theNumberOfBooks',
            key: 'theNumberOfBooks',
            render: (num, bookIndex, index) => (
              <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                <Button
                  onClick={async () => {
                    const clonedBookIndexes = clone(bookIndexes)
                    clonedBookIndexes[index].buttonDisabled = true
                    setBookIndexes(clonedBookIndexes)
                    await plusOne(bookIndex.id)
                  }}
                  style={{ marginRight: '1rem' }}
                  size="small"
                  disabled={bookIndex.buttonDisabled}
                >+
                </Button>
                <div style={{ display: 'flex', justifyContent: 'center', width: '2rem' }}>{num}</div>
                <Button
                  onClick={async () => {
                    const clonedBookIndexes = clone(bookIndexes)
                    clonedBookIndexes[index].buttonDisabled = true
                    setBookIndexes(clonedBookIndexes)
                    await minusOne(bookIndex.id)
                  }}
                  style={{ marginLeft: '1rem' }}
                  size="small"
                  disabled={!num || bookIndexes[index].buttonDisabled}
                >-
                </Button>
              </div>
            ),
            sorter: true
          },
          {
            title: 'action',
            dataIndex: '',
            key: 'delete',
            render: (action, bookIndex, index) => (
              <Popover content="删除书籍">
                <Button onClick={() => { deleteBookIndex(bookIndex.id) }}><DeleteTwoTone /></Button>
              </Popover>
            ) }
        ]}
      />
    </div>
  )
}
