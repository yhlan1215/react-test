import { BookList } from "./BookList";
import { useState } from "react"; 
import { BookDetail } from "./BookDetail";
import "./index.css"

export const ProjectListScreen = () => {
    const [selelctID,setSelectID] = useState("")
    const [bookListOutdatedFlag,setBookListOutdatedFlag] = useState(false)
    return(
        <div className="mainContainer">
                <div className="subContainer1">
                <h1>书籍列表</h1>
                <BookList onBookClick={(id)=>{setSelectID(id)}} onBookCreate={()=>{setSelectID("newBook")}}
                outdatedFlag={bookListOutdatedFlag}/></div>
                <div className="subContainer2"><BookDetail id={selelctID} onBookSaved={()=>{setBookListOutdatedFlag(!bookListOutdatedFlag)}}/></div>
        </div>
    )
}