import { Form, Input } from 'antd'
import axios from 'axios'
import { useEffect, useRef } from 'react'

export function AuthorDetail({ authorID }) {
  const formRef = useRef()

  useEffect(() => {
    getAuthor(authorID)
  }, [authorID])

  const getAuthor = async (authorID) => {
    const { data } = await axios({
      url: `http://localhost:8080/authors/${authorID}`
    })
    formRef.current.setFieldsValue(data)
  }

  return (
    <div>
      <Form
        ref={formRef}
      >
        <Form.Item
          label="姓名"
          name="name"
        >
          <Input />
          <Form.Item
            label="性别"
            name="sex"
          >
            <input />
          </Form.Item>
        </Form.Item>
      </Form>
    </div>
  )
}
