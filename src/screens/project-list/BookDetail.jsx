import { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, InputNumber, Select, Radio } from 'antd'
import axios from 'axios'

const { Option } = Select

export function BookDetail({ bookID, onBookSaved }) {
  const formRef = useRef()
  const [originalBook, setOriginalBook] = useState()
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    getAuthors()
  }, [])

  useEffect(() => {
    if (bookID) {
      if (bookID !== 'newBook') {
        getOneBook(bookID)
      } else {
        const newBook = {
          isOld: Boolean,
          name: '',
          author: {
            id: ''
          },
          price: 0,
          category: '',
          language: '',
          id: ''
        }
        formRef.current.setFieldsValue(newBook)
        setOriginalBook(newBook)
      }
    }
  }, [bookID])

  const getAuthors = async () => {
    const { data } = await axios({
      url: 'http://localhost:8080/authors'
    })
    setAuthors(data)
  }

  const getOneBook = async (bookID) => {
    const { data } = await axios({
      url: `http://localhost:8080/books/${bookID}`
    })
    formRef.current.setFieldsValue(data)
    setOriginalBook(data)
  }

  const putOneBook = async (book) => {
    const { data } = await axios({
      method: 'put',
      url: `http://localhost:8080/books/${bookID}`,
      data: book
    })
    formRef.current.setFieldsValue(data)
    setOriginalBook(data)
  }

  const createBook = async (book) => {
    const { data } = await axios({
      method: 'post',
      url: 'http://localhost:8080/books',
      data: book
    })
    const author = authors.find((author) => author.id === data.author)
    data.author = { id: author.id, name: author.name }
    formRef.current.setFieldsValue(data)
    setOriginalBook(data)
  }

  const onSave = () => {
    formRef.current.validateFields()
      .then(async (book) => {
        const clonedBook = JSON.parse(JSON.stringify(book))
        clonedBook.author = clonedBook.author.id
        if (bookID !== 'newBook') {
          await putOneBook(clonedBook)
        } else {
          await createBook(clonedBook)
        }
        onBookSaved()
      })
  }

  return (
    <div>
      <Form
        ref={formRef}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          label="书籍名称"
          name="name"
        >
          <Input type="text" placeholder="请输入书名" />
        </Form.Item>
        <Form.Item
          label="作者"
          name={['author', 'id']}
        >
          <Select>
            {authors.map((author) => <Option value={author.id}>{author.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          label="价格"
          name="price"
        >
          <InputNumber min="0" prefix="¥" />
        </Form.Item>
        <Form.Item
          label="种类"
          name="category"
        >
          <Select>
            <Option key="fiction" value="fiction">小说</Option>
            <Option key="literature" value="literature">文学</Option>
            <Option key="art" value="art">艺术</Option>
            <Option key="animation humor" value="animation humor">动画幽默</Option>
            <Option key="entertainment fashion" value="entertainment fashion">娱乐时尚</Option>
            <Option key="tourism" value="tourism">旅游</Option>
            <Option key="map geography" value="map geography">地图地理</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="新旧"
          name="isOld"
        >
          <Radio.Group>
            <Radio value={false}>新</Radio>
            <Radio value>旧</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="语言"
          name="language"
        >
          <Select>
            <Option key="Chinese" value="Chinese">中文</Option>
            <Option key="English" value="English">英语</Option>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 4, span: 8 }}
        >
          <Button onClick={onSave} type="primary">保存</Button>
          <Button onClick={() => { formRef.current.setFieldsValue(originalBook) }}>取消</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
