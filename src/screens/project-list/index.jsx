import { useState } from 'react'
import { BookList } from './BookList'
import { BookDetail } from './BookDetail'
import './index.css'

export function ProjectListScreen() {
  const [selectID, setSelectID] = useState('')
  const [bookListOutdatedFlag, setBookListOutdatedFlag] = useState(false)

  return (
    <div className="mainContainer">
      <div className="subContainer1"><BookList
        onBookClick={(id) => { setSelectID(id) }}
        onBookCreate={() => { setSelectID('newBook') }}
        outdatedFlag={bookListOutdatedFlag}
      />
      </div>
      <div className="subContainer2"><BookDetail
        id={selectID}
        onBookSaved={() => { setBookListOutdatedFlag(!bookListOutdatedFlag) }}
      />
      </div>
    </div>
  )
}
