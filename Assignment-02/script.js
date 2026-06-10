const form = document.getElementById("bookForm");
const booksDiv = document.getElementById("books");

const API_URL = "http://localhost:5000/api/books";

// Load Books
async function loadBooks() {

    const response = await fetch(API_URL);

    const books = await response.json();

    booksDiv.innerHTML = "";

    books.forEach(book => {

        booksDiv.innerHTML += `
            <div class="book">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Genre: ${book.genre}</p>
                <p>Price: ${book.price}</p>
            </div>
        `;
    });
}

// Add Book
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const newBook = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        genre: document.getElementById("genre").value,
        price: document.getElementById("price").value
    };

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
    });

    form.reset();

    loadBooks();
});

loadBooks();