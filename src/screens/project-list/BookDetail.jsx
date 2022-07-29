import { useEffect, useRef, useState } from 'react'
import { Button, Form, InputNumber, Radio, Select } from 'antd'
import axios from 'axios'

export function BookDetail({ id, onBookSaved }) {
  const formRef = useRef()
  const [authors, setAuthors] = useState([])
  const [originalBook, setOriginalBook] = useState()
  const { Option } = Select

  useEffect(() => {
    getAuthors()
  }, [])

  useEffect(() => {
    if (id) {
      if (id !== 'newBook') {
        getOneBook(id)
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
  }, [id])

  const getOneBook = async (bookID) => {
    const { data } = await axios({
      url: `http://localhost:8080/books/${bookID}`
    })
    formRef.current.setFieldsValue(data)
    setOriginalBook(data)
  }

  const getAuthors = async () => {
    const { data } = await axios({
      url: 'http://localhost:8080/authors'
    })
    setAuthors(data)
  }

  const putOneBook = async (book) => {
    const { data } = await axios({
      method: 'put',
      url: `http://localhost:8080/books/${id}`,
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
        if (id !== 'newBook') {
          await putOneBook(clonedBook)
        } else {
          await createBook(clonedBook)
        }
        onBookSaved()
      })
  }

  const onCancel = () => {
    formRef.current.setFieldsValue(originalBook)
  }

  return (
    <Form ref={formRef}>
      <Form.Item
        label="书籍名称"
        name="name"
        rules={[
          { required: true,
            message: '请输入书名' }
        ]}
      >
        <input type="text" placeholder="书名" />
      </Form.Item>
      <Form.Item
        label="价格"
        name="price"
        rules={[
          {
            required: true,
            message: '请输入价格'
          }
        ]}
      >
        <InputNumber placeholder="价格" />
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
        label="书籍类别"
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
          <Option value="English">英语</Option>
          <Option value="Chinese">中文</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button onClick={onSave}>保存</Button>
        <Button onClick={onCancel}>取消</Button>
      </Form.Item>
    </Form>
  )
}
