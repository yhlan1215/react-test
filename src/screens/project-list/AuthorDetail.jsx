import axios from 'axios'
import { useEffect, useState } from 'react'
import { List } from 'antd'

export function AuthorDetail({ authorID }) {
  const [author, setAuthor] = useState({})

  useEffect(() => {
    if (authorID) {
      getAuthor()
    }
  }, [authorID])

  const getAuthor = async () => {
    const { data } = await axios({
      url: `http://localhost:8080/authors/${authorID}`
    })
    setAuthor(data)
  }

  return (
    <div>
      <div>作者：{author.name}</div>
      <div>性别：{author.sex}</div>
      <div>出生日期：{author.birth}</div>
      <List
        dataSource={author.books}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  )
}
