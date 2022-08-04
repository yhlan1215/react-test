import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { BookList } from './BookList'
import './index.css'
import { BookDetail } from './BookDetail'
import { AuthorList } from './AuthorList'
import { AuthorDetail } from './AuthorDetail'

export function ProjectListScreen() {
  return (
    <div>
      <Router>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/AuthorList">作者列表</Link>
          </li>
          <li>
            <Link to="/BookList">书籍列表</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<div>欢迎</div>} />
          <Route path="/AuthorList" element={<AuthorList />} />
          <Route path="/AuthorList/:authorId" element={<AuthorDetail />} />
          <Route path="/BookList" element={<BookList />} />
          <Route path="/BookList/:bookId" element={<BookDetail />} />
        </Routes>
      </Router>
    </div>
  )
}
