        import React, { useRef,useState } from 'react'
        import {useNavigate } from 'react-router-dom';
        import Navbar from './Navbar'
        import axios from 'axios'
        
        import './signup.css'
        import './createnewproduct.css'
        import { toast } from 'react-toastify';
        import { getError } from './utils';
import { SERVERMACHINE } from './envconfig';
import Footer from './Footer';
        const CreateNewProduct = () => {
          const navigate=useNavigate()
          
           const [nameError, setNameError] = useState("");
           const [no_of_reviewError, setNo_of_reviewError] = useState();
           const [countInStoreError, setCountInStoreError] = useState();
          const [categoryError, setCategoryError] = useState("");
          const [ratingError, setRatingError] = useState();
          const [priceError, setPriceError] = useState();
          const [descriptionError, setDescriptionError] = useState("");
         const [imageError, setImageError] = useState("");
          const [success, setSuccess] = useState();
          const nameRef = useRef();
          const priceRef = useRef();
          const descriptionRef = useRef();
          const categoryRef = useRef();
          const no_of_reviewRef = useRef();
          const countInStockRef = useRef();
          const imageRef = useRef();
          const ratingRef = useRef();
           const removeErrorMessage = () => {
             const removeTime = setTimeout(() => {
               setNameError('')
               setImageError('')
               setDescriptionError('')
               setCountInStoreError('')
               setNo_of_reviewError('')
               setPriceError('')
               setCategoryError('')
               setRatingError('')
               setSuccess('')
             }, 2000);
             return () => {
               clearTimeout(removeTime);
             };
           };
          const registerSubmitHandler = async(e) => {
            console.log(e)
            e.preventDefault();
            let name = nameRef.current.value
            let no_of_review = no_of_reviewRef.current.value
            let countInStock = countInStockRef.current.value
            let rating=ratingRef.current.value
            let category = categoryRef.current.value
            let image =imageRef.current.files[0]
            let description = descriptionRef.current.value
            let price=priceRef.current.value
            if (name === ""|| name === null) {
              setNameError('Enter Product Name')
              removeErrorMessage()
            }
            if (
               no_of_review=== "" ||
               no_of_review === null
            ) {
              setNo_of_reviewError("Enter product no of reviews");
              removeErrorMessage();
            }
            if (
              countInStock === "" ||
              countInStock === null
            ) {
              setCountInStoreError("Enter product number in stock ");
              removeErrorMessage();
            }

            if (
              rating === "" ||
              rating === null
            ) {
              setRatingError("Enter Product rating");
              removeErrorMessage();
            }
            if (category ===""|| category===null) {
              setCategoryError('Enter Product category ')
              removeErrorMessage();
            }
            if (image === ""|| name === null) {
              setImageError('insert Product image')
              removeErrorMessage()
            }
            if (
               price=== "" ||
               price === null
            ) {
              setPriceError("Enter product price");
              removeErrorMessage();
            }
            if (
              description === "" ||
              description === null
            ) {
              setDescriptionError("Enter product description ");
              removeErrorMessage();
            }

            if (
              (name !== "") &&
              (rating !== "") &&
              (no_of_review !== "") &&
              (category !== "") &&
              (description !== "") &&
              (price !== "") &&
              (countInStock !== "") &&
              (image !== "")
            ) {
        
      const formData = new FormData();
     formData.append('image', image);
     formData.append('name', name);
     formData.append('rating', rating);
     formData.append('no_of_review', no_of_review);
     formData.append('category', category);
     formData.append('description', description);
     formData.append('price', price);
     formData.append('countInStock', countInStock);
     
      // axios.post('http://localhost:5000/api/admin/createnewproduct',formData)
      axios.post(`${SERVERMACHINE}/api/admin/createnewproduct`,formData)
      .then((response)=>{
        console.log(response)
        setSuccess('success')
        removeErrorMessage()
        e.target.reset();    
        navigate('/admin/allproducts') 
      })
      .catch((err)=>{
      console.log(err)
      toast.error(getError(err))
      })      
      e.target.reset();
      }}  
      return (
            <div className="container">
              <Navbar />
              <section className="signupSectione">
                <h2 className="accounttxt">Create New Product</h2>
                
                <article >
                  <form  onSubmit={registerSubmitHandler} >
                    <div className='formCont'>
                    <div  className='formlf'>
                  <input
                      ref={nameRef}
                      type="text"
                      placeholder="Asset Name"
                      className="input adinput"
                      style={{width:'88%'}}
                    />
                    <small className="error">{nameError}</small>
                    <input
                      ref={no_of_reviewRef}
                      type="number"
                      placeholder="Asset Volume"
                      className="input adinput"
                      style={{width:'88%'}}
                    />
                    <small className="error">{no_of_reviewError}</small>
                      <input
                        ref={countInStockRef}
                        className="input adinput"
                        type='number'
                        placeholder="number of item in stock"
                        
                      />
                    <small className="error">{countInStoreError}</small>
                      <input
                        ref={descriptionRef}
                        className="input adinput"
                        type='text'
                        placeholder="description"
                      />
                    <small className="error">{descriptionError}</small>
                  </div>
                  <div className='formlf'>
                  <input
                      ref={ratingRef}
                      type="number"
                      placeholder="rating"
                      className="input adinput"
                      style={{width:'88%'}}
                    />
                    <small className="error">{ratingError}</small>
                      <input
                        ref={categoryRef}
                        className="input adinput"
                        type='text'
                        placeholder="category"
                      />
                    <small className="error">{categoryError}</small>
                      <input
                        ref={priceRef}
                        className="input adinput"
                        type='number'
                        placeholder="price"
                      />
                    <small className="error">{priceError}</small>
                    <div style={{border:"solid",textAlign:"center",cursor:"pointer"}} className='input adinput'>
                    <input
                      ref={imageRef}
                      type="file"
                      placeholder="image"
                      className="input adinput"
                      style={{display:"none"}}
                      id='file'
                    />
                    <label htmlFor="file"
                    className="label"
                    >
                      Asset image
                    </label>
                    </div>
                    
                    <small className="error">{imageError}</small>
                  </div>

                    </div>
                    <div style={{width:"100%",margin:"auto",textAlign:"center",paddingTop:"2rem"}}>
                    <small className="success">{success}</small>
                    <button className="btn continue" style={{textAlign:"center"}}>Create</button>
                    </div>
                    
                  </form>
                </article>
              </section>
              <Footer/>
            </div>
          );
        }
        
        export default CreateNewProduct