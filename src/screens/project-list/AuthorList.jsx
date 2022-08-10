import { Button, Popover, Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EditTwoTone } from '@ant-design/icons'

export function AuthorList({ onAuthorAdd }) {
  const [authors, setAuthors] = useState([])
  const [allLength, setAllLength] = useState(0)
  const [page, setPage] = useState(1)
  const nav = useNavigate()

  useEffect(() => {
    getAuthors(page)
  }, [page])

  const getAuthors = async (page) => {
    const { data, headers } = await axios({
      url: `http://localhost:8080/authors/?page=${page}&limit=5`
    })
    data.forEach((author) => { author.key = author.id })
    setAuthors(data)
    setAllLength(parseInt(headers.length, 10))
  }

  const paginationProps = {
    defaultPageSize: 5,
    total: allLength
  }

  return (
    <div>
      <div>
        总计{allLength}名
      </div>
      <div style={{ textAlign: 'right' }}>
        <Popover content="添加作者">
          <Button
            onClick={() => { nav('/AuthorList/newAuthor') }}
            style={{ marginBottom: '2vh' }}
          ><EditTwoTone />添加
          </Button>
        </Popover>
      </div>
      <Table
        pagination={paginationProps}
        onChange={(pagination) => { setPage(pagination.current) }}
        dataSource={authors}
        columns={[
          {
            title: '作者名',
            dataIndex: 'name',
            key: 'name',
            render: (authorName, author, index) => (
              <Popover content="详情">
                <Link to={`/AuthorList/${author.id}`}>{author.name}</Link>
              </Popover>
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
