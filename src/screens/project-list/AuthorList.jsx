import { Button, Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function AuthorList({ onAuthorAdd }) {
  const [authors, setAuthors] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    getAuthors()
  }, [])

  const getAuthors = async () => {
    const { data } = await axios({
      url: 'http://localhost:8080/authors'
    })
    setAuthors(data)
  }

  return (
    <div>
      <Button onClick={() => { nav('/AuthorList/newAuthor') }}>新建</Button>
      <Table
        dataSource={authors}
        columns={[
          {
            title: '作者名',
            dataIndex: 'name',
            key: 'name',
            render: (authorName, author, index) => (
              <Link to={`/AuthorList/${author.id}`}>{author.name}</Link>
            )
          },
          {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render: (sex, author, index) => {
              if (sex === 'male') {
                return '男'
              }
              return '女'
            }
          }
        ]}
      />
    </div>
  )
}
