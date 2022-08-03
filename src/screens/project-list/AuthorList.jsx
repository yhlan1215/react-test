import { Button, Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function AuthorList({ onAuthorClick, onAuthorAdd }) {
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
      <Button onClick={() => { onAuthorAdd() }}>新建</Button>
      <Table
        dataSource={authors}
        columns={[
          {
            title: '作者名',
            dataIndex: 'name',
            key: 'name',
            render: (authorName, author, index) => (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <a onClick={() => {
                onAuthorClick(author.id)
              }}
              >
                {author.name}
              </a>
            )
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
