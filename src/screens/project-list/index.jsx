import { useState } from "react";
import { BookList } from "./BookList";
import { BookDetail } from "./BookDetail";
import"./index.css"

export const ProjectListScreen = () =>{
    const[selectID,setSelectID]=useState('')
    const[bookListOutdatedFlag, setBookListOutdatedFlag] = useState(false)

    return (<div className="mainContainer">
        <div className="subContainer1">
            <h1>书籍列表</h1>
            <BookList outdatedFlag={bookListOutdatedFlag} onBookClick={(id)=>{setSelectID(id)}} onBookCreate={()=>{setSelectID("newBook")}}/></div>
        <div className="subContainer2"><BookDetail id={selectID} onBookSaved={() => {setBookListOutdatedFlag(!bookListOutdatedFlag)}}/></div>
    </div>)
}