import React from "react";
import BookModel from "../../../models/BookModel";

export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className="card my-3 shadow p-3 bg-body rounded">
      <div className="row g-5">
        <div className="col-md-2">
          <div className="d-flex d-lg-block justify-content-center align-items-center">
            {props.book.img ?
              <img src={props.book.img} alt="Book" width={123} height={196}/>
              : <img src={require('../../../Images/BooksImages/book-1.jpeg')} alt="Book" width={123} height={196}/>}
          </div>
          {/*<div className="d-lg-none d-flex justify-content-center align-items-center">*/}
          {/*  {props.book.img ?*/}
          {/*    <img src={props.book.img} alt="Book" width={123} height={196}/>*/}
          {/*    : <img src={require('../../../Images/BooksImages/book-1.jpeg')} alt="Book" width={123} height={196}/>}*/}
          {/*</div>*/}
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className='card-title'>{props.book.author}</h5>
            <h4>{props.book.title}</h4>
            <p className='card-text'>{props.book.description}</p>
          </div>
        </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <a href="#" className='btn main-color btn-primary text-white'>View Details</a>
        </div>
      </div>
    </div>
  )
}