# Wanderlust-Project

## 🚀 Overview  
Wanderlust is a full-stack web application built with Node.js, Express, EJS, and MongoDB. It provides an interactive travel platform where users can explore destinations, share travel stories, and plan trips.  
This project showcases my skills in full-stack development, routing, templating, data persistence, and deployment readiness.

## 🧩 Tech Stack  
- **Backend:** Node.js + Express  
- **Templating / Views:** EJS  
- **Database:** MongoDB (with Mongoose)  
- **Frontend:** HTML5, CSS3, vanilla JavaScript  
- **Architecture:** MVC (Models → Controllers → Routes → Views)  
- **Assets & Static Files:** Served from `/public`

## 📂 Project Structure  
/
├─ controllers/ # business logic for routes
├─ models/ # Mongoose schemas & models
├─ routes/ # Express route definitions
├─ views/ # EJS templates (pages/layouts)
├─ public/ # static assets: CSS, JS, images
├─ utils/ # helper modules & utilities
├─ app.js # main Express application
├─ package.json # project metadata & dependencies
└─ .gitignore # files/folders excluded from Git


## ✅ Features  
- Modular architecture enabling clean separation of concerns.  
- Dynamic rendering with EJS, including layouts and partials.  
- User stories: browse destinations, add travel logs, plan trips (customise based on your implemented features).  
- Persistent backend storage with MongoDB via Mongoose.  
- Static assets and front-end served via Express from `/public`.  
- Built with extendability in mind — you can add more features like user profiles, reviews, bookings.


## 🛠 Installation & Setup  
1. Clone the repository:  
   ```bash
   git clone https://github.com/pra90mathur/wanderlust-project.git
   cd wanderlust-project
2. Install dependencies:

   npm install
   
3. Create your configuration/environment variables (e.g., MONGO_URI, PORT, SESSION_SECRET).

   Create a file like .env (if using dotenv) or edit cloudconfig.js.

4. Start the development server:

   npm start
   Or if you have a dev script (e.g., using nodemon):
   npm run dev

5. Open your browser and navigate to http://localhost:<PORT> to view the app.

   

🔍 Usage

- Navigate to the homepage to view travel destinations.
- Register / login (if implemented) to create your own travel logs.
- Use the navigation menu (add links if relevant) to browse, add, edit, delete items.
- Extend the user experience by adding new features such as search, filtering, user dashboard, etc.

  

📌 Roadmap / Future Improvements

 - User authentication & authorization
 - Add reviews and ratings for destinations
 - Integrate map/geolocation services to show destination markers
 - Responsive UI with a modern front-end framework (React/Vue)
 - Add unit & integration tests
 - CI/CD pipeline with automated deployments (Render)
 - Dark mode toggle & theming options

   

🤝 Contributing

- Contributions are very welcome! To contribute:
- Fork the repository.
- Create a new branch: git checkout -b feature/YourFeature.
- Make your changes, commit them: git commit -m "Add your feature description".
- Push your branch: git push origin feature/YourFeature.
- Open a Pull Request with a clear explanation of what you’ve done and why.
