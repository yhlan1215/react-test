import axios from "axios";
import { useEffect,useState } from "react";
export const BookDetail = ({id, onBookSaved}) => {
    const[book,setBook]=useState(undefined)
    const[originalBook,setOriginalBook]=useState(undefined)
    const[authors,setAuthors]=useState([])
    useEffect(()=>{
        const getAuthors = async() => {
            const{data}=
            await axios({
                url:"http://localhost:8080/authors"
            })
            setAuthors(data)
        }
        getAuthors()
    },[])

    useEffect(()=>{
        if(id){
            if (id!=="newBook"){
                const getOneBook = async() => {
                    const{data}=
                    await axios({
                        url:`http://localhost:8080/books/${id}`
                    })
                    setBook(data)
                    setOriginalBook(data)
                }
                getOneBook()
            } else {
                const newBook = {
                    "isOld": false,
                    "name": "",
                    "author": {
                        "id": ""
                    },
                    "price": 0,
                    "category": "fiction",
                    "language": "Chinese",
                    "id": ""
                }
                setBook(newBook)       
                setOriginalBook(newBook)       
            }
        }
    },[id])
    const putOneBook = async() => {
        book.author = book.author.id
        const{data}=
        await axios({
            method:"put",
            url:`http://localhost:8080/books/${id}`,
            data:book
        })
        setBook(data)
        setOriginalBook(data) 
    }
    const createBook = async() => {
        book.author = book.author.id
        const{data}=
        await axios({
            method:"post",
            url:"http://localhost:8080/books",
            data:book
        })
        setBook(data)
        setOriginalBook(data) 
    }

    const onSave = async ()=>{
        if(id!=="newBook") {
            await putOneBook();
        } else {
            await createBook()
        }
        onBookSaved()
    }

    const onCancel = () => {
        setBook(originalBook)
    }

    if (!book) return null;
    return (
        <div><div>书名：</div>
            <input style={{width:"150px"}} type="text" value={book.name} onChange={(event) => {
                    const clonedBook = JSON.parse(JSON.stringify(book))
                    clonedBook.name = event.currentTarget.value
                    setBook(clonedBook)
                }}/>
            <div style={{marginTop:"20px"}}>{"id:"+book.id}</div>
            <div>
                <div style={{margintop:"20px"}}>作者</div>
                <select style={{width:"150px"}} value={book.author.id}  onChange={(event)=>{ 
                    const clonedBook = JSON.parse(JSON.stringify(book))
                    clonedBook.author.id = event.currentTarget.selectedOptions[0].value
                    setBook(clonedBook) 
                }}>
                {authors.map((author) => <option value={author.id}>{author.name}</option>)}
                </select>
                <div style={{marginTop:"20px"}}>价格: </div>
                <input style={{width:"150px"}} type="number" value={book.price} onChange={(event) => {
                    const clonedBook = JSON.parse(JSON.stringify(book))
                    clonedBook.price = parseFloat(event.currentTarget.value)
                    setBook(clonedBook)
                }}/>
                <div style={{marginTop:"20px"}}>语言：</div>
                <select value={book.language} style={{width:"150px"}}
                onChange={(event)=>{ 
                    const clonedBook = JSON.parse(JSON.stringify(book))
                    clonedBook.language = event.currentTarget.selectedOptions[0].value
                    setBook(clonedBook) 
                }}>
                    <option value="English">英语</option>
                    <option value="Chinese">中文</option>
                </select>
                <div style={{marginTop:"20px"}}>新旧: </div>
                <input type="radio" name="isOld" checked={!book.isOld} onChange={(event) => {
                    const clonedBook = JSON.parse(JSON.stringify(book))
                    clonedBook.isOld = false
                    setBook(clonedBook)
                }}/>新
                <input type="radio" name="isOld" checked={book.isOld} style={{marginLeft: "80px"}} onChange={(event) => {
                    const clonedBook = JSON.parse(JSON.stringify(book))
                    clonedBook.isOld = true
                    setBook(clonedBook)
                }}/>旧
                <div style={{marginTop:"20px"}}>类别：</div>

                <select style={{width:"150px"}} value={book.category}  onChange={(event) => {
                    const clonedBook = JSON.parse(JSON.stringify(book))
                    clonedBook.category = event.currentTarget.selectedOptions[0].value
                    setBook(clonedBook)
                }}>
                    <option value="fiction" >fiction</option>
                    <option value= "literature">literature</option>
                    <option value= "art">art</option>
                    <option value= "animation humor">animation humor</option>
                    <option value= "entertainment fashion">entertainment fashion</option>
                    <option value= "tourism">tourism</option>
                    <option value= "map geography">map geography</option>
                </select>
            </div>
            <button style={{marginTop:"20px"}} onClick={onSave}>保存</button>
            <button style={{marginTop:"20px", marginLeft: "30px"}} onClick={onCancel}>取消</button>
        </div>
    )
}