import { Popover, Table } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export function BookStoreList() {
  const [bookStores, setBookStores] = useState([])
  const [allLength, setAllLength] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getBookStores(page)
  }, [page])

  const getBookStores = async (page) => {
    const { data, headers } = await axios({
      url: `http://localhost:8080/bookstores?page=${page}&limit=5`
    })
    setAllLength(parseInt(headers.length, 10))
    setBookStores(data)
  }

  const paginationProps = {
    defaultPageSize: 5,
    total: allLength
  }

  return (
    <div>
      <div>
        总计{allLength}家
      </div>
      <Table
        pagination={paginationProps}
        onChange={(pagination) => { setPage(pagination.current) }}
        dataSource={bookStores}
        columns={[
          {
            title: '书店名称',
            dataIndex: 'name',
            key: 'name',
            render: (bookStoreName, bookStore, index) => (
              <Popover content="书店详情">
                <Link to={`/BookStoreList/${bookStore.id}`}>{bookStoreName}</Link>
              </Popover>
            ) }
        ]}
      />
    </div>
  )
}
