import { Button, Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function AuthorList({ onAuthorClick }) {
  const [authors, setAuthors] = useState([])

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
      <Table
        dataSource={authors}
        columns={[
          {
            title: '作者名',
            dataIndex: 'name',
            key: 'name',
            // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            render: (authorName, author, index) => <Button onClick={() => onAuthorClick(author.id)}>{author.name}</Button>
          },
          {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex'
          }
        ]}
      />
    </div>
  )
}
