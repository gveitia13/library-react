import {useEffect, useState} from "react";
import BookModel from "../../../models/BookModel";

export const ReturnBook = () => {
  const [books, setBooks] = useState<BookModel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const fetchBooks = async () => {
      const baseURL: string = 'http://localhost:7000/api/books'

      const url = `${baseURL}?page=0&size=9`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Somethings went wrong!')
      }
      const responseJson = await response.json()

      const responseData = responseJson._embedded.books

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
  }, [])

  if (isLoading) {
    return (
      <div className="container m-5">
        <p>Loading...</p>
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
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className='text-center'>
        <img src={require('../../../Images/BooksImages/book-1.jpeg')} alt="Book" width={151} height={233}/>
        <h6 className={'mt-2'}>Book</h6>
        <p>Luv2Code</p>
        <a href="#" className={'btn main-color text-white'}>Reserve</a>
      </div>
    </div>
  )
}