import axios from "axios"
import { useEffect, useState } from "react"

export const AuthorList = ({id}) => {
    const [author, setAuthor] = useState([])

    useEffect(() => {
        if(id){
        const getAuthor = async () => {
        const {data} = await axios({
            method:'get',
            url:`http://localhost:8080/authors${author.id}`,
          })
          setAuthor(data)
        }
        getAuthor();
    }
    }, [id])


    return( 
        <div style={{marginTop:"10px"}}>
            <div>作者</div>
    <select style={{width:"150px"}} value={author.id}>
        <option value="62d283e95b4af466755e9ecb">马伯庸</option>
        <option value="62d284b85b4af466755e9ede">南派三叔</option>
        <option value="62d285325b4af466755e9eed">莫言</option>
    </select>
    </div>    
    )
}