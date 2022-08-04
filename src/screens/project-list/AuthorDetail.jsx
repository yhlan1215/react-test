import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Button, DatePicker, Form, Input, Radio } from 'antd'
import moment from 'moment'

export function AuthorDetail({ authorId, onAuthorSaved }) {
  const formRef = useRef()
  const [originalAuthor, setOriginalAuthor] = useState()

  useEffect(() => {
    if (authorId) {
      if (authorId !== 'newAuthor') {
        getAuthor()
      } else {
        const newAuthor = {
          name: '',
          sex: 'male',
          birth: undefined
        }
        formRef.current.setFieldsValue(newAuthor)
        setOriginalAuthor(newAuthor)
      }
    }
  }, [authorId])

  const getAuthor = async () => {
    const { data } = await axios({
      url: `http://localhost:8080/authors/${authorId}`
    })
    data.birth = moment(data.birth)
    formRef.current.setFieldsValue(data)
    setOriginalAuthor(data)
  }

  const putOneAuthor = async (author) => {
    const { data } = await axios({
      method: 'put',
      url: `http://localhost:8080/authors/${authorId}`,
      data: author
    })
    data.birth = moment(data.birth)
    formRef.current.setFieldsValue(data)
    setOriginalAuthor(data)
  }

  const addAuthor = async (author) => {
    const { data } = await axios({
      method: 'post',
      url: 'http://localhost:8080/authors',
      data: author
    })
    data.birth = moment(data.birth)
    formRef.current.setFieldsValue(data)
    setOriginalAuthor(data)
  }

  const onSave = () => {
    formRef.current.validateFields()
      .then(async (author) => {
        const clonedAuthor = JSON.parse(JSON.stringify(author))
        if (authorId !== 'newAuthor') {
          await putOneAuthor(clonedAuthor)
        } else {
          await addAuthor(clonedAuthor)
        }
        onAuthorSaved()
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
          <DatePicker disabledDate={(currentDate) => currentDate > moment()} />
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 4, span: 8 }}
        >
          <Button onClick={onSave} type="primary">保存</Button>
          <Button onClick={() => { formRef.current.setFieldsValue(originalAuthor) }}>取消</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

[1, 2, 3].forEach((element) => {

})
