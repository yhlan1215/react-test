import { Layout, Menu } from 'antd'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { HomeTwoTone, BookTwoTone, UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { BookList } from './BookList'
import { BookDetail } from './BookDetail'
import { AuthorList } from './AuthorList'
import { AuthorDetail } from './AuthorDetail'

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
    } else { setSelectedKeys('home') }
  }, [location])
  return (
    <Layout>
      <Sider collapsible>
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
            }
          ]}
        />
      </Sider>
      <Content style={{ margin: '3vh' }}>
        <Routes>
          <Route path="/" element={<div>欢迎</div>} />
          <Route path="/AuthorList" element={<AuthorList />} />
          <Route path="/AuthorList/:authorId" element={<AuthorDetail />} />
          <Route path="/BookList" element={<BookList />} />
          <Route path="/BookList/:bookId" element={<BookDetail />} />
        </Routes>
      </Content>
    </Layout>
  )
}
