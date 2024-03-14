import React, { useEffect, useState } from 'react'
import './App.css'
import axioss from 'axios'
import img1 from './Assets/ea208a9dcfd4c21ad3303fb19cb6d899.jpg'
import { Formik, Form, Field } from 'formik';
const App = () => {
useEffect(() => {
  getImage();
},[])


const [image, setImages] = useState(null)
  const [photo , setPhoto] = useState([])
  const [allImages, setAllimages] = useState(null)
  const [value, setValue] = useState("")

  const input = (e) => {
    setValue(e.target.value)
  }
  const tambah = () => {
    const newPhoto = img1
    setPhoto([...photo,newPhoto])
  }
  const kurang = () => {
    setPhoto([...photo,])
  }

  
  
  const submitImage = async (e) => {
    e.preventDefault()
    
    
    const formData = new FormData()
    formData.append("image",image)
    const result = await axioss.post(
      'http://localhost:5000/upload-image',
      formData,
      {
        headers:{"Content-Type":"multipart/form-data"},
      }
    )
    }

  const onInputChange = (e) => {
    console.log(e.target.files[0])
    setImages(e.target.files[0])
  }

  const getImage = async() => {
    const result = await axioss.get('http://localhost:5000/get-image')
    console.log(result)
    setAllimages(result.data.data)
  }

  
  
  return (
    <div>
      
      {/* <div className='button_tambah'>
      <button onClick={tambah}>Pencetttttttttttttttttttttt</button>
      </div> */}

      <form onSubmit={submitImage}>
        <input 
        type="file"
         id="myFile"
          name="filename"
           accept='image/*'
            onChange={onInputChange}
            value={value}
            onInput={input}/>
        <input 
       type="submit"
       disabled={!value}/>
      </form>

      {/* <div>
      {photo.map((photos,index)=> (
           <img key={index} src={photos} alt={`Gambar ${index}`} />
      ))}
      </div> */}

      {allImages == null ? "" :  allImages.map((data) => {
        return  (
          <div className='container_card'>

            <img src={require(`./Images/${data.image}`)}
              className='image_card'/>
          </div>
        )
      })}
      
    </div>
  )
}

export default App

