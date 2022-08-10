import { Popover, Table } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export function BookStoreList() {
  const [bookStores, setBookStores] = useState([])

  useEffect(() => {
    getBookStores()
  }, [])

  const getBookStores = async () => {
    const { data } = await axios({
      url: 'http://localhost:8080/bookstores'
    })
    setBookStores(data)
  }

  return (
    <div>
      <Table
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
