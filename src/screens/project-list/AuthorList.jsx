import { Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function AuthorList() {
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    getAuthors
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
            key: 'name'
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
