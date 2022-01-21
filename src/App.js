
import { useState } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Loader from "react-loader-spinner";
import Modal from './components/Modal';
import Button from './components/Button';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDataLoader from './servises/useDataLoader'

const App = () => {
  const [value,setValue] = useState('');
  const [modal,setModal] = useState(false);
  const [contentModal,setContentModal] = useState('');
  const [page,setPage] = useState(1);
  const [pictures,loader,error] = useDataLoader(value,page);


  const submitForm = (value) => {
    setValue(value);
    setPage(1);
  }
 
 
  const modalFunc=(src) => {
    setContentModal(src);
    setModal(prevState => !prevState);
    }
    
  const modalContent = () => {
    setModal(prevState=>!prevState)
  }
  
  const loadMore = () => {
    setPage(prevState=>prevState+1)

  }
    return (
      <section className='App'>
       
      <Searchbar  onSubmit={submitForm} />
        
        {pictures.length >= 1 &&
          <ImageGallery
          items={pictures}
          modalFn={modalFunc} />}
        
        {pictures.length >= 11 &&
          <Button onClickFn={loadMore}>Load more</Button>}
         {error && <p>Something bad....</p>}
        {loader &&<div className='loader-wrapper'>
          <Loader className='loader'
        type="Circles"
        color="#3f51b5"
        height={"80%"}
        width={"80%"}
          timeout={30000} //3 secs
        /></div>}
        
        {modal &&
          <Modal
            src={contentModal}
            onClick={modalContent}
             />}
        
        <ToastContainer />
        
    </section>)
  
}

export default App;
