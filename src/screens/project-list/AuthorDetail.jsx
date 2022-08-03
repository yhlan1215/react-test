import axios from 'axios'
import { useEffect, useRef } from 'react'
import { Button, Form, Input, Radio } from 'antd'

export function AuthorDetail({ authorId }) {
  const formRef = useRef()

  useEffect(() => {
    if (authorId !== 'newAuthor') {
      getAuthor()
    } else {
      const newAuthor = {
        name: '',
        sex: '',
        birth: ''
      }
    }
    formRef.current.setFieldsValue(newAuthor)
  }, [authorId])

  const getAuthor = async () => {
    const { data } = await axios({
      url: `http://localhost:8080/authors/${authorId}`
    })
    formRef.current.setFieldsValue(data)
  }

  const putOneAuthor = async (author) => {
    const { data } = await axios({
      method: 'put',
      url: `http://localhost:8080/authors/${authorId}`,
      data: author
    })
    formRef.current.setFieldsValue(data)
  }

  const addAuthor = async (author) => {
    const { data } = ({
      method: 'post',
      url: 'http://localhost:8080/authors',
      data: author
    })
    formRef.current.setFieldsValue(data)
  }

  const onSave = () => {
    formRef.current.validateFields()
      .then(async (author) => {
        const clonedAuthor = JSON.parse(JSON.stringify(author))
        if (authorId !== 'newAuthor') {
          putOneAuthor(clonedAuthor)
        } else {
          addAuthor(clonedAuthor)
        }
      })
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
        </Form.Item>
        <Form.Item
          label="性别"
          name="sex"
        >
          <Radio.Group>
            <Radio value="male">
              男
            </Radio>
            <Radio value="female">
              女
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="出生日期"
          name="birth"
        >
          <Input />
        </Form.Item>
        <Button onClick={() => onSave()}>保存</Button>
      </Form>
    </div>
  )
}
