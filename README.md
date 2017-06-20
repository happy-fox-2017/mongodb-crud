# mongodb-crud
| Route | Method | Usage | Result |
|:---:|:---:|:---|:---|
|/api/books|POST| Send body form with isbn,title,author,category and stock as attributes | Created book |
|/api/books/|GET|Just send request | Return all book|
|/api/books/:id|PATCH| Send body form with isbn or title or author or category or stock as attributes, depends on your need | Return affected document |
|/api/books/:id| DELETE | Just send request | Return deleted document |
