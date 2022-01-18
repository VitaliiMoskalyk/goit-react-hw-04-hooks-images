
import { useEffect, useState } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Loader from "react-loader-spinner";
import Modal from './components/Modal';
import Button from './components/Button';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from './components/servises/getData';

const App = () => {
  const [value,setValue] = useState('');
  const [loader,setLoader] = useState(false);
  const [pictures,setPictures] = useState([]);
  const [modal,setModal] = useState(false);
  const [contentModal,setContentModal] = useState('');
  const [page,setPage] = useState(1);
  
  useEffect(() => {
    if (value === '') return;
    else {
      setLoader(true);

      // Андрей, я помню твое замечание - вінести в отдельній метод.
      //   немного отстаю - разберусь с кастомными хуками и хочу запилить его в кастомный хук.
      //   Проверь пожалуйста остальное, чтоб я знал, что кроме этого исправить
      
      api.getData(value, page).then((data) => {
        if (data.total === 0) {
          toast(`There is no pictures-'${value}'`);
          return;
        }
        page === 1 ? setPictures(data.hits) : setPictures([...pictures, ...data.hits]);
        toast(`We are find ${pictures.length} images from ${data.total}`);
      })
        .catch((error) => console.log(error))
        .finally(() => setLoader(false))
    };

    
  }, [value, page]);
 
  const submitForm = (value) => {
    setValue(value);
    setPage(1);
  }
 
 
  const modalFunc=(src) => {
    setContentModal(src);
    setModal(!modal);
    }
    
    return (
      <section className='App'>

      <Searchbar  onSubmit={submitForm} />
      
        {pictures.length >= 1 &&
          <ImageGallery
          items={pictures}
          modalFn={modalFunc} />}
        
        {pictures.length >= 11 &&
          <Button onClickFn={()=>setPage(page+1)}>Load more</Button>}
        
        {loader &&
          <Loader className='loader'
        type="Circles"
        color="#3f51b5"
        height={"80%"}
        width={"80%"}
          timeout={30000} //3 secs
        />}
        
        {modal &&
          <Modal
            src={contentModal}
            onClick={()=>setModal(!modal)}
             />}
        
        <ToastContainer />
        
    </section>)
  
}

export default App;
