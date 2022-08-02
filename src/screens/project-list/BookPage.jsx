import { useState } from 'react'
import { BookList } from './BookList'
import { BookDetail } from './BookDetail'
import { AuthorDetail } from './AuthorDetail'

export function BookPage() {
  const [selectBookId, setSelectBookId] = useState('')
  const [selectAuthorId, setSelectAuthorId] = useState('')
  const [bookListOutdatedFlag, setBookListOutdatedFlag] = useState(false)

  return (
    <div className="mainContainer">
      <div className="subContainer1"><BookList
        onBookClick={(bookID) => { setSelectBookId(bookID) }}
        onBookCreate={(bookID) => { setSelectBookId('newBook') }}
        onAuthorClick={(authorID) => { setSelectAuthorId(authorID) }}
        outdatedFlag={bookListOutdatedFlag}
      />
      </div>
      <div className="subContainer2"><BookDetail bookID={selectBookId} onBookSaved={() => { setBookListOutdatedFlag(!bookListOutdatedFlag) }} /></div>
      <div className="subContainer3"><AuthorDetail authorID={selectAuthorId} /></div>
    </div>
  )
}
