import { Layout, Menu } from 'antd'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { HomeTwoTone, BookTwoTone, UserOutlined, AccountBookTwoTone } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { BookList } from './BookList'
import { BookDetail } from './BookDetail'
import { BookStoreList } from './BookStoreList'
import { AuthorList } from './AuthorList'
import { AuthorDetail } from './AuthorDetail'
import { BookStoreDetail } from './BookStoreDetail'

const { Sider, Content } = Layout

export function ProjectListScreen() {
  const nav = useNavigate()
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState('')
  useEffect(() => {
    if (location.pathname.includes('/BookList')) {
      setSelectedKeys('book')
    } else if (location.pathname.includes('/AuthorList')) {
      setSelectedKeys('author')
    } else if (location.pathname.includes('/BookStoreList')) {
      setSelectedKeys('bookStore')
    } else { setSelectedKeys('home') }
  }, [location])
  return (
    <Layout>
      <Sider collapsible style={{ height: '100vh' }}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKeys]}
          items={[
            {
              key: 'home',
              label: '首页',
              icon: <HomeTwoTone />,
              onClick: () => { nav('/') }
            },
            {
              key: 'author',
              label: '作者',
              icon: <UserOutlined />,
              onClick: () => { nav('/AuthorList') }
            },
            {
              key: 'book',
              label: '书籍',
              icon: <BookTwoTone />,
              onClick: () => { nav('/BookList') }
            },
            {
              key: 'bookStore',
              label: '书店',
              icon: <AccountBookTwoTone />,
              onClick: () => { nav('/BookStoreList') }
            }
          ]}
        />
      </Sider>
      <Content style={{ padding: '3vh', height: '100vh', overflow: 'scroll' }}>
        <Routes>
          <Route path="/" element={<div>欢迎</div>} />
          <Route path="/AuthorList" element={<AuthorList />} />
          <Route path="/AuthorList/:authorId" element={<AuthorDetail />} />
          <Route path="/BookList" element={<BookList />} />
          <Route path="/BookList/:bookId" element={<BookDetail />} />
          <Route path="/BookStoreList" element={<BookStoreList />} />
          <Route path="/BookStoreList/:bookStoreId" element={<BookStoreDetail />} />
        </Routes>
      </Content>
    </Layout>
  )
}
