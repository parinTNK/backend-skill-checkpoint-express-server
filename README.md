# Express Q&A API

A RESTful API for managing questions and answers with voting, built using Express.js and PostgreSQL with Prisma ORM.

---

## Key Features

- Complete CRUD operations for questions
- Answer management (create, retrieve, delete)
- Question search by category or title
- Voting system for questions & answers
- Interactive API documentation with Swagger UI
- Middleware validation & standardized error handling

---

## Tech Stack

- **Node.js** (v18+)
- **Express.js**
- **PostgreSQL**
- **Prisma ORM**
- **Swagger UI**

---

## Project Structure
```
├── controllers
│   └── questionsController.mjs
├── middleware
│   ├── errorHandler.mjs
│   └── validation.mjs
├── routes
│   └── questionsRoutes.mjs
├── utils
│   └── db.mjs
├── prisma
│   └── schema.prisma
├── docs
│   └── swagger.yaml
├── .env.example
├── .gitignore
├── app.mjs
├── package.json
├── package-lock.json
└── README.md
```


---

## API Endpoints

### **Questions**

- **`GET /questions`**
  - Description: Get all questions, optionally filter by category or title.
  - Query Parameters:
    - `category` (optional): Filter questions by category.
    - `title` (optional): Search questions by title (partial match).
- **`GET /questions/:questionId`**
  - Description: Get a specific question by its ID.
- **`POST /questions`**
  - Description: Create a new question.
  - Request Body: `{ "title": "string", "content": "string", "category": "string" }`
- **`PUT /questions/:questionId`**
  - Description: Update an existing question.
  - Request Body: `{ "title": "string", "content": "string", "category": "string" }`
- **`DELETE /questions/:questionId`**
  - Description: Delete a question by its ID.

### **Answers**

- **`GET /questions/:questionId/answers`**
  - Description: Get all answers for a specific question.
- **`POST /questions/:questionId/answers`**
  - Description: Create a new answer for a specific question.
  - Request Body: `{ "content": "string" }`
- **`DELETE /questions/:questionId/answers/:answerId`**
  - Description: Delete a specific answer by its ID.

### **Voting**

- **`POST /questions/:questionId/vote`**
  - Description: Vote on a question (upvote/downvote).
  - Request Body: `{ "voteType": "up" | "down" }`
- **`POST /answers/:answerId/vote`**
  - Description: Vote on an answer (upvote/downvote).
  - Request Body: `{ "voteType": "up" | "down" }`

---

## Setup & Run

### **Prerequisites**

- Node.js (v18 or higher recommended)
- PostgreSQL database server running
- npm (usually comes with Node.js)

### **Steps**

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    - Create a `.env` file in the root directory.
    - Copy the contents from `.env.example` and fill in your database connection string:
      ```env
      DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database_name>"
      # Example: DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/qna_db"
      ```

4.  **Apply database migrations:**
    - Ensure your PostgreSQL server is running.
    - Run Prisma migrate to create the database schema:
      ```bash
      npx prisma migrate dev --name init
      ```
      *(This will also generate the Prisma Client)*

5.  **Start the server:**
    ```bash
    npm run start
    ```
    The API server will start, typically on port `4000`. You should see a confirmation message in the console.

---



