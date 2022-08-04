import { useState } from 'react'
import { AuthorList } from './AuthorList'
import { AuthorDetail } from './AuthorDetail'

export function AuthorPage() {
  const [selectAuthorId, setSelectAuthorId] = useState('')
  const [authorListOutdatedFlag, setAuthorListOutdatedFlag] = useState(false)
  return (
    <div className="mainContainer">
      <div className="subContainer1">
        <AuthorList
          onAuthorClick={
            (authorId) => {
              setSelectAuthorId(authorId)
            }
          }
          onAuthorAdd={
            (authorId) => {
              setSelectAuthorId('newAuthor')
            }
          }
          outdatedFlag={authorListOutdatedFlag}
        />
      </div>
      <div className="subContainer2">
        <AuthorDetail
          authorId={selectAuthorId}
          onAuthorSaved={() => { setAuthorListOutdatedFlag(!authorListOutdatedFlag) }}
        />
      </div>
    </div>
  )
}
