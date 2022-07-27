import { Button, Form, Input, InputNumber, Radio, Select,  } from "antd";
import FormItem from "antd/lib/form/FormItem";
import axios from "axios";
import { useEffect,useState } from "react";

const {Option} = Select

export const BookDetail = ({id,onBookSaved}) => {
    const [book,setBook] = useState(undefined)
    const [authors,setAuthors] = useState([])
    const [originalBook,setOriginalBook] = useState(undefined)
    useEffect(()=>{
        getAuthors()
        },[])

    useEffect(()=>{
        if(id){
            if(id!=="newBook"){
        getOneBook(id)
            }
            else{
                const newBook ={
                    "isOld": false,
                    "name": "",
                    "author": {
                        "id": "62d283e95b4af466755e9ecb"
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

        const getOneBook = async(bookID) => {
        const{data} =
        await axios({
            url:`http://localhost:8080/books/${bookID}`
        })
        setBook(data)
        setOriginalBook(data)
    }

        const getAuthors = async() => {
            const{data}=
            await axios({
                url:"http://localhost:8080/authors"
        })
        setAuthors(data)
        }

        const putOneBook = async() =>{
            book.author = book.author.id
            const{data} = 
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
            const{data} =
            await axios ({
                method:"post",
                url:"http://localhost:8080/books",
                data:book
            })
            setBook(data)
            setOriginalBook(data)
        }

        const onSave = async() => {
            if(id!=="newBook"){
                await putOneBook()
            }else{
                await createBook()
            }
            onBookSaved()
        }
        
        const onCancel = () => {
            setBook(originalBook)
        }

    if(!book) return null
    else return(
        <div>
            {/* <div>
            <div>书名</div>
            <input type="text" value={book.name} onChange={(event)=>{
                const clonedBook = JSON.parse(JSON.stringify(book))
                clonedBook.name = event.currentTarget.value
                setBook(clonedBook)
            }}/>
            <div>作者</div>
            <select value={book.author.id} onChange={(event)=>{
                const clonedBook = JSON.parse(JSON.stringify(book))
                clonedBook.author.id = event.currentTarget.selectedOptions[0].value
                setBook(clonedBook)
            }}>
                {authors.map((author)=><option key={author.id} value={author.id}>{author.name}</option>)}
            </select>
            <div>类别</div>
            <select value={book.category} onChange={(event)=>{
                const clonedBook = JSON.parse(JSON.stringify(book))
                clonedBook.category = event.currentTarget.selectedOptions[0].value
                setBook(clonedBook)
            }}>
                <option key="fiction" value="fiction">小说</option>
                <option key="literature" value="literature">文学</option>
                <option key="art" value="art">艺术</option>
                <option key="animation humor" value="animation humor">动画幽默</option>
                <option key="entertainment fashion" value="entertainment fashion">娱乐时尚</option>
                <option key="tourism" value="tourism">旅游</option>
                <option key="map geography" value="map geography">地图地理</option>
            </select>
            <div>新旧</div>
            <input name="isOld" type="radio" checked={!book.isOld} onChange={(event)=>{
                const clonedBook = JSON.parse(JSON.stringify(book))
                clonedBook.isOld = false
                setBook(clonedBook)
            }}/>新
            <input name="isOld" type="radio" checked={book.isOld} onChange={(event)=>{
                const clonedBook = JSON.parse(JSON.stringify(book))
                clonedBook.isOld = true
                setBook(clonedBook)
            }}/>旧
            <div>语言</div>
            <select value={book.language} onChange={(event)=>{
                const clonedBook = JSON.parse(JSON.stringify(book))
                clonedBook.language = event.currentTarget.selectedOptions[0].value
                setBook(clonedBook)
            }}>
                <option key="Chinese" value="Chinese">中文</option>
                <option key="English" value="English">英语</option>
            </select>
            <div>价格</div>
            <input type="number" value={book.price} onChange={(event)=>{
                const clonedBook = JSON.parse(JSON.stringify(book))
                clonedBook.price = parseFloat(event.currentTarget.value)
                setBook(clonedBook)
            }}/>
            </div>
            <button onClick={onSave}>保存</button>
            <button onClick={onCancel}>取消</button> */}
            <Form
            name="bookDetail">
                <Form.Item
                label="书名"
                name="bookName"
                rules={[
                    {
                        required:true,
                        message:"请输入书名"
                    }
                ]}>
                    <Input type="text" setFieldsValue(book.name) placeholder="书名" onChange={(event)=>{
                        const clonedBook = JSON.parse(JSON.stringify(book))
                        clonedBook.name = event.currentTarget.value
                        setBook(clonedBook)
                    }}/>
                </Form.Item>
                <Form.Item
                label="价格"
                name="bookPrice"
                rules={[
                    {
                        required:true,
                        message:"请输入价格"
                    }
                ]}>
                    <InputNumber addonBefore="¥" min="0" defaultValue={book.price} placeholder="价格" onChange={(event)=>{
                        const clonedBook = JSON.parse(JSON.stringify(book))
                        clonedBook.price = parseFloat(event.currentTarget.value)
                        setBook(clonedBook)
                    }}/>
                </Form.Item>
                <FormItem
                label="作者"
                >
                    <Select value={book.author.id} onChange={(event)=>{
                        const clonedBook = JSON.parse(JSON.stringify(book))
                        clonedBook.author.id = event.currentTarget.selectedOptions[0].value
                        setBook(clonedBook)
                    }}>
                        {authors.map((author)=><Option value={author.id}>{author.name}</Option>)}
                    </Select>
                </FormItem>
                <Form.Item
                label="种类">
                    <Select defaultValue={book.category} onChange={(event)=>{
                        const clonedBook = JSON.parse(JSON.stringify(book))
                        clonedBook.category = event.currentTarget.selectedOptions[0].value
                        setBook(clonedBook)
                    }}>
                        <Option key="fiction" value="fiction">小说</Option>
                        <Option key="literature" value="literature">文学</Option>
                        <Option key="art" value="art">艺术</Option>
                        <Option key="animation humor" value="animation humor">动画幽默</Option>
                        <Option key="entertainment fashion" value="entertainment fashion">娱乐时尚</Option>
                        <Option key="tourism" value="tourism">旅游</Option>
                        <Option key="map geography" value="map geography">地图地理</Option>
                    </Select>   
                </Form.Item>
                <Form.Item
                label="新旧">
                    <Radio.Group key="bookIsOld" defaultValue={book.isOld}>
                        <Radio value={book.isOld} onChange={(event)=>{
                        const clonedBook = JSON.parse(JSON.stringify(book))
                        clonedBook.isOld = true
                        setBook(clonedBook)
                    }}>新</Radio>
                        <Radio value={!book.isOld}>旧</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                label="语言">
                    <Select key="bookLanguage" defaultValue={book.language} onChange={(event)=>{
                        const clonedBook = JSON.parse(JSON.stringify(book))
                        clonedBook.language = event.currentTarget.selectedOptions[0].value
                        setBook(clonedBook)
                    }}>
                        <Option key="Chinese" value="Chinese">中文</Option>
                        <Option key="English" value="English">英语</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={onSave}>保存</Button>
                    <Button onClick={onCancel}>取消</Button>
                </Form.Item>
            </Form>
        </div>
    )
}