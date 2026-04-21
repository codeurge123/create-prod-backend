# create-prod-backend

Build a **production-ready Next.js App & Express backend** in seconds — no boilerplate, no setup headaches.

---

##  Installation

Use directly with **npx** (recommended):

```bash
npx create-prod-backend
```

Or install globally:

```bash
npm install -g create-prod-backend
create-prod-backend
```

---

## Features

*  Instant Express.js backend setup
*  Clean and scalable folder structure
*  Optional MongoDB integration
*  Environment variable support (.env)
*  Select dependencies interactively
*  Production-ready scripts
*  Developer-friendly CLI

---

## What It Generates

### Express Backend 
```
project-name/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   ├── db/
│   │
│   ├── app.js
│   ├── index.js
│   └── constants.js
│
├── public/
│    └──temp/
|
├── .env
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── .gitignore
├── package.json
└── README.md
```

### Next.js App

```
my-app/
│── app/
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│
│── public/
│   ├── favicon.ico
│   ├── images...
│
│── node_modules/
│
│── package.json
│── package-lock.json / yarn.lock
│── next.config.js
│── jsconfig.json / tsconfig.json
│── .gitignore
│── README.md

```


---

## Usage

Run the CLI:

```bash
npx create-prod-backend
```

### You’ll be prompted for:

* Project name
* MongoDB setup (Yes/No)
* .env file (Yes/No)
* Dependencies to install
* Auto install dependencies

---

## Supported Dependencies
* express
* cors
* dotenv
* cookie-parser
* nodemon (devDependency)
* bcryptjs (Optional)
* zod (Optional)
* argon2 (Optional)
* jsonwebtoken (Optional)
* cloudinary (Optional)
* multer (Optional)
* mongoose (Optional)

---

## Scripts

After setup:

```bash
npm run dev     # Development (nodemon)
npm start       # Production
```

---

## Example

```bash
npx create-prod-backend

✔ Enter project name: my-app
✔ Use MongoDB: Yes
✔ Use .env: Yes
✔ Install dependencies: Yes
```

Your backend is ready!

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (optional)
* Inquirer (CLI prompts)
* Chalk (CLI styling)

---

## Upcoming Features

* Service layer support
* Auth template (JWT)
* Docker setup - ✔️
* Soon Implement own Next.js - currently uses vercel package
* TypeScript support

---

## Contributing

Contributions are welcome!

```bash
git clone https://github.com/codeurge123/create-prod-backend
cd create-prod-backend
npm install
```

---

## License

ISC License

---

## Author

Made by **codeurge316 - @yashbansal**

---

## Support

If you like this project:

* Star the repo
* Share with others
* Suggest new features

---

## Final Thought

Stop wasting time setting up backend boilerplate.
Start building real projects.

- **create-prod-backend** does the setup — you build the product.
