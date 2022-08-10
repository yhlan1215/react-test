import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Button, Form, InputNumber, message, Modal, Popover, Select, Table } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { EditTwoTone, DeleteTwoTone, RollbackOutlined } from '@ant-design/icons'
import { clone } from './utils'

export function BookStoreDetail() {
  const [bookStore, setBookStore] = useState(undefined)
  const [books, setBooks] = useState([])
  const { bookStoreId } = useParams()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { Option } = Select
  const formRef = useRef()
  const nav = useNavigate()

  useEffect(() => {
    getBooks()
  }, [])

  useEffect(() => {
    if (bookStoreId) {
      getBookStore()
    }
  }, [bookStoreId])

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
    data.forEach((book) => { book.OptionDisabled = false })
    setBooks(data)
  }

  const getBookStore = async () => {
    const { data } = await axios({
      url: `http://localhost:8080/bookstores/${bookStoreId}`
    })
    data.books.forEach((book) => {
      book.buttonDisabled = false
      book.key = book.id
    })
    setBookStore(data)
  }

  const plusOne = async (bookIndexId) => {
    await axios({
      method: 'put',
      url: `http://localhost:8080/bookindexes/${bookIndexId}/plus`
    })
    getBookStore()
  }

  const minusOne = async (bookIndexId) => {
    await axios({
      method: 'put',
      url: `http://localhost:8080/bookindexes/${bookIndexId}/minus`
    })
    getBookStore()
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
    getBookStore()
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

  if (!bookStore) {
    return null
  } return (
    <div>
      <Button onClick={() => { nav('/BookStoreList') }}><RollbackOutlined /></Button>
      <Popover content="添加书籍">
        <Button onClick={openModal}><EditTwoTone />添加</Button>
      </Popover>
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
                {books.filter((book) => !bookStore.books.filter((bookIndex) => bookIndex.book === book.id).length)
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
        dataSource={bookStore.books}
        columns={[
          {
            title: '书籍',
            dataIndex: 'book',
            key: 'book',
            render: (bookId, book, index) => (books.find((book) => book.id === bookId) ? books.find((book) => book.id === bookId).name : '找不到')
          },
          {
            title: '数量',
            dataIndex: 'theNumberOfBooks',
            key: 'theNumberOfBooks',
            render: (num, bookIndex, index) => (
              <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                <Button
                  onClick={async () => {
                    const clonedBookStore = clone(bookStore)
                    clonedBookStore.books[index].buttonDisabled = true
                    setBookStore(clonedBookStore)
                    await plusOne(bookIndex.id)
                  }}
                  style={{ marginRight: '1rem' }}
                  size="small"
                  disabled={bookStore.books[index].buttonDisabled}
                >+
                </Button>
                <div style={{ display: 'flex', justifyContent: 'center', width: '2rem' }}>{num}</div>
                <Button
                  onClick={async () => {
                    const clonedBookStore = clone(bookStore)
                    clonedBookStore.books[index].buttonDisabled = true
                    setBookStore(clonedBookStore)
                    await minusOne(bookIndex.id)
                  }}
                  style={{ marginLeft: '1rem' }}
                  size="small"
                  disabled={!num || bookStore.books[index].buttonDisabled}
                >-
                </Button>
              </div>
            )
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
