import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { BookPage } from './BookPage'
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
            <Link to="/BookPage">书籍列表</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" component={ProjectListScreen} />
          <Route path="/BookPage" component={BookPage} />
        </Routes>
      </Router>
    </div>
  )
}
