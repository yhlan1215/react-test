import { useState } from 'react'
import { BookList } from './BookList'
import { BookDetail } from './BookDetail'
import { AuthorDetail } from './AuthorDetail'
import './index.css'

export function ProjectListScreen() {
  const [selectID, setSelectID] = useState('')
  const [bookListOutdatedFlag, setBookListOutdatedFlag] = useState(false)

  return (
    <div className="mainContainer">
      <div className="subContainer1"><BookList
        onBookClick={(bookID) => { setSelectID(bookID) }}
        onBookCreate={(bookID) => { setSelectID('newBook') }}
        onAuthorClick={(authorID) => { setSelectID(authorID) }}
        outdatedFlag={bookListOutdatedFlag}
      />
      </div>
      <div className="subContainer2"><BookDetail bookID={selectID} onBookSaved={() => { setBookListOutdatedFlag(!bookListOutdatedFlag) }} /></div>
      <div className="subContainer3" authorID={selectID}><AuthorDetail /></div>
    </div>
  )
}
