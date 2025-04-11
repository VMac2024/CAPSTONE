# CAPSTONE

This purpose of this website is to address the increasing need for environmental knowledge, by providing a collaborative sharing and knowledge platform. The intention is for anyone to have access to, and to share knowledge in the environmental and sustainability area.

NOTE: this ReadMe file has been written from the perpective of use

## BACKEND (React)

- Express – Node.js web framework
- Sequelize – ORM for MySQL
- MySQL2 – SQL database
- JWT – User authentication
- Multer – File uploads (PDFs)
- BcryptJS – Password hashing
- CORS – Cross-Origin Resource Sharing
- Dotenv – Environment variable management

## FRONTEND (Vite)

- React v19 – UI Library
- Vite – Lightning-fast development bundler
- Material UI (MUI) – Styled components
- Axios – HTTP requests
- React Router v7 – Routing
- React-PDF / @react-pdf/renderer – Render and preview PDFs

## Folder Strcutre:

Follows conventions, including the MVC convention:
/
├── backend/ # Express API & Sequelize ORM setup
│ └── ... # Models, Routes, Controllers
├── frontend/ # Vite + React + MUI
│ └── ... # Components, Pages, Contexts
├── docker-compose.yml # Container setup for dev/prod
└── README.md # This file

## How to use:

This website is intended to be downloaded and implemented using Docker and AWS Deployment.

## Getting Started:

1. Git clone repo = https://github.com/VMac2024/CAPSTONE.

2. Setup the Backend: run npm install

3. Setup the Frontend: run npm install.

## Running the program:

Run Backend and Frontend concurrently, from separate terminals.

Backend: ensure you are in /backend/ folder before running (npm start)
Frontend: ensure you are in /frontend/ folder before running (npm run dev).

By running both at the same time, you will be able to access the full scope of the fullstack program.

This program is set up to allow both local and production environments. Please ensure you configure these environments correctly depending on your requirements at the time.

## Securities:

This site has been set up to ensure that any person posting or uploading must be logged in first.
Each user will be asked their environmental expertise, and their access level will be granted on that basis.
("Enthusiast" = "User" (cannot upload articles, but can post and comment))
("Professional" - "Contributor" (can upload articles as well as post and comment))

## Planned support & Deployment:

Docker support is planned for this project as part of the deployment phase, but not yet implemented.

AWS Deployment is planned for this project as a deemed suitable

## Future Enhancements:

Admin Users given overall access as well as veto power on any articles / posts / comments deemend inappropriate for the site.
