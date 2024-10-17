package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Book struct {
	ID     string `json:"id"`
	Title  string `json:"title"`
	Author string `json:"author"`
	Link   string `json:"link"`
}

var books = []Book{
	{ID: "1", Title: "Clean Code", Author: "Robert C. Martin", Link: "https://example.com/clean-code"},
	{ID: "2", Title: "You Don’t Know JS", Author: "Kyle Simpson", Link: "https://example.com/ydkjs"},
	{ID: "3", Title: "The Pragmatic Programmer", Author: "Andy Hunt and Dave Thomas", Link: "https://example.com/pragmatic-programmer"},
}

func GetBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)
}

func main() {
	// Initialize the mux router.
	router := mux.NewRouter()

	// Define the API route for books.
	router.HandleFunc("/api/books", GetBooks).Methods("GET")

	// Start the server.
	log.Println("Books API server started on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
