import axios from "axios"
import { useEffect, useState } from "react"

export const AuthorList = () => {
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        const getAuthors = async () => {
        const {data} = await axios({
            method:'get',
            url:'http://localhost:8080/authors',
          })
          setAuthors(data)
        }
        getAuthors();
    }, [])


    return <ul>
        {
            authors.map((author) => <li key={author.id}>{author.name}</li>)
        }
    </ul>
}