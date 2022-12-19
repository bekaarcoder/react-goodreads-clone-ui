import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBooks, reset } from "../features/book/bookSlice";
import noCover from "../noCover.png";

const BookList = () => {
    const dispatch = useDispatch();
    const { content, isLoading, isError, isSuccess } = useSelector(
        (state) => state.book
    );

    useEffect(() => {
        console.log("Fetching books...");
        dispatch(getBooks());

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    if (isLoading) return <p className="my-5 text-center">Loading...</p>;

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-12">
                    <Link
                        className="btn btn-outline-success"
                        to="/manage/books/add"
                    >
                        Add Book
                    </Link>
                    <table className="table table-striped table-hover table-responsive my-4">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Cover Image</th>
                                <th>Pages</th>
                                <th>Published Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {content?.books?.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.name}</td>
                                    <td>
                                        <img
                                            src={
                                                book.coverImage
                                                    ? book.coverImage
                                                    : noCover
                                            }
                                            alt={book.name}
                                            width="50"
                                        />
                                    </td>
                                    <td>{book.pages}</td>
                                    <td>{book.publishedDate}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning">
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-sm btn-danger ms-3">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookList;
