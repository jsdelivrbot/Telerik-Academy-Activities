/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/

function solve() {
	var library = (function () {
		var books = [];
		var categories = [];

		function stringValidation(text) {
		    if (text.length < 2 || text.length > 100) {
		        throw new Error('name must be between 2 and 100 characters');
		    }
		}

		function isBookInList(newBook) {
		    return books.some(function (book) {
		        return book.title === newBook.title || book.isbn === newBook.isbn;
		    })

		}
		function listBooks(options) {
		    var result = [];

		    if (options && options.author) {
		        result = books.filter(function (book) {
		            return book.author === options.author;
		        })
		    }
		    else if (options && options.category) {
		        result = books.filter(function (book) {
		            return book.category === options.category;
		        })
		    }
		    else {
		        result = books;
		    }

		    //sort books by ID
		    result = result.sort(function (firstBook, secondBook) {
		        return firstBook.ID - secondBook.ID;
		    })

		    return result;
		}

		function addBook(book) {
		    stringValidation(book.title);
		    stringValidation(book.author);

		    if (!(book.isbn.length === 10) && !(book.isbn.length === 13)) {
		        throw new Error('ISBN is an unique code that contains either 10 or 13 digits');
		    }

		    if (isBookInList(book)) {
                throw new Error('book with such title and ISBN already exist')
		    }


		    if (categories.indexOf(book.category) === -1) {
		        categories.push(book.category);
		    }

		    book.ID = books.length + 1;
		    books.push(book);
		    return book;
		}

		function listCategories() {
            //sort categories
		    categories = categories.sort(function (firstCategory, secondCategory) {
		        return firstCategory - secondCategory;
		    });

		    return categories;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	}());

	return library;
}
module.exports = solve;
