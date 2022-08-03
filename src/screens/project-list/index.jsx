import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { BookPage } from './BookPage'
import { AuthorList } from './AuthorList'
import './index.css'

export function ProjectListScreen() {
  return (
    <div>
      <Router>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/AuthorPage">作者列表</Link>
          </li>
          <li>
            <Link to="/BookPage">书籍列表</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<div>欢迎</div>} />
          <Route path="/AuthorPage" element={<AuthorList />} />
          <Route path="/BookPage" element={<BookPage />} />
        </Routes>
      </Router>
    </div>
  )
}
