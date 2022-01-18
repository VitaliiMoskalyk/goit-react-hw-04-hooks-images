import { useState } from "react";
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  Searchbarr,
} from "./Searchbar.styled";
import propTypes from "prop-types";
import { MdFindReplace } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const submitForm = (evt) => {
    evt.preventDefault();
    if (value.trim() === "") {
      toast("Please, enter search word");
      return;
    }
    onSubmit(value.trim());
    setValue("");
  };

  return (
    <Searchbarr>
      <ToastContainer />
      <SearchForm onSubmit={submitForm}>
        <SearchFormButton type="submit">
          <MdFindReplace />
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus="on"
          placeholder="Search images and photos"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value.toLowerCase())}
        />
      </SearchForm>
    </Searchbarr>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

export default Searchbar;
