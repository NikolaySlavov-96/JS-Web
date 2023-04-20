const Book = require("../models/Book");

async function getAll() {
    return await Book.find({}).lean();
};

async function getById(id) {
    return await Book.findById(id).lean();
};

async function createBook(book) {
    return await Book.create(book);
};

async function updateBook(id, book) {
    const bookData = await Book.findById(id);
    
    bookData.titleBook = book.titleBook
    bookData.author = book.author
    bookData.genge = book.gange;
    bookData.start = book.start;
    bookData.image = book.image;
    bookData.bookReview = book.bookReview;

    await bookData.save();
    return
};

async function deleteById(id) {
    return await Book.findByIdAndDelete(id);
};

async function wisheBook(idBook, idUser) {

}

module.exports = {
    getAll,
    getById,
    createBook,
    updateBook,
    deleteById,
    wisheBook
}