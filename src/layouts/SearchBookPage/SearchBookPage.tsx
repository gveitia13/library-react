import React, {useEffect, useState} from "react";
import BookModel from "../../models/BookModel";
import {Spinner} from "../../shared/Spinner";
import {SearchBook} from "./components/SearchBook";
import {Pagination} from "../Utils/Pagination";

export const SearchBookPage = () => {
  const [books, setBooks] = useState<BookModel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [bookPerPage] = useState(5)
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchBooks = async () => {
      const baseURL: string = 'http://localhost:7000/api/books'

      const url = `${baseURL}?page=${currentPage - 1}&size=${bookPerPage}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Somethings went wrong!')
      }
      const responseJson = await response.json()

      const responseData = responseJson._embedded.books

      setTotalAmountOfBooks(responseJson.page.totalElements)
      setTotalPages(responseJson.page.totalPages)

      const loadedBooks: BookModel[] = []

      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img
        })
      }
      setBooks(loadedBooks)
      setIsLoading(false)
    }
    fetchBooks().catch((error: any) => {
      setIsLoading(false)
      setHttpError(error.message)
    })
    window.scrollTo(0, 0)
  }, [bookPerPage, currentPage])

  if (isLoading) {
    return (
      <div className="container m-5 d-flex justify-content-center">
        <Spinner></Spinner>
      </div>
    )
  }
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    )
  }

  const indexOfLastBook = currentPage * bookPerPage
  const indexOfFirstBook = indexOfLastBook - bookPerPage
  let lastItem = bookPerPage * currentPage <= totalAmountOfBooks ?
    bookPerPage * currentPage : totalAmountOfBooks

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="">
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input type="search" className='form-control me-2' placeholder='Search' aria-labelledby='Search'/>
                <button className='btn btn-outline-success'>Search</button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type='button' id='dropdownMenuButton1'
                        data-bs-toggle='dropdown' aria-expanded='false'>Category
                </button>
                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                  <li><a href="#" className='dropdown-item'>All</a></li>
                  <li><a href="#" className='dropdown-item'>Front End</a></li>
                  <li><a href="#" className='dropdown-item'>Back End</a></li>
                  <li><a href="#" className='dropdown-item'>Data</a></li>
                  <li><a href="#" className='dropdown-item'>DevOps</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className='mt-3'>
            <h5>Number of results: ({totalAmountOfBooks})</h5>
          </div>
          <p>{indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:</p>
          {books.map(book => (<SearchBook book={book} key={book.id}></SearchBook>))}
          {totalPages > 1 &&
            <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}></Pagination>}
        </div>
      </div>
    </div>
  )
}