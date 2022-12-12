import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchAuthor } from "../features/author/authorSlice";

const AddBook = () => {
    const [showResult, setShowResult] = useState(false);
    const [author, setAuthor] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const dispatch = useDispatch();
    const { authors, loading, isSuccess, isError } = useSelector(
        (state) => state.author
    );

    const onKeyUp = () => {
        if (author) {
            dispatch(searchAuthor(author));
            setShowResult(authors.length > 0);
            setSearchResults(authors);
        } else {
            setShowResult(false);
        }
    };

    const selectAuthor = (e) => {
        console.log(e.target.getAttribute("data-id"));
        console.log(e.target.value);
        setAuthor(e.target.value);
        setShowResult(false);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Add Book</h2>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Book Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3 author-search-container">
                            <label className="form-label">Author</label>
                            <input
                                type="text"
                                name="author"
                                className="form-control"
                                onChange={(e) => setAuthor(e.target.value)}
                                value={author}
                                onKeyUp={onKeyUp}
                            />
                            <div
                                className="search-result"
                                style={{
                                    display: showResult ? "block" : "none",
                                }}
                            >
                                {loading ? (
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item text-center">
                                            Loading...
                                        </li>
                                    </ul>
                                ) : (
                                    <div className="list-group list-group-flush">
                                        {searchResults.map((searchResult) => (
                                            <button
                                                type="button"
                                                className="list-group-item list-group-item-action"
                                                key={searchResult.id}
                                                data-id={searchResult.id}
                                                onClick={selectAuthor}
                                                value={`${searchResult.firstName} ${searchResult.lastName}`}
                                            >
                                                {`${searchResult.firstName} ${searchResult.lastName}`}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Pages</label>
                            <input
                                type="text"
                                name="pages"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Published Date</label>
                            <input
                                type="date"
                                name="publishedDate"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Book Cover</label>
                            <input
                                type="text"
                                name="coverImage"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                className="form-control"
                            ></textarea>
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-dark" type="submit">
                                Add Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBook;
