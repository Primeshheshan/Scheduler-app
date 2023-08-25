# Scheduler App

The Scheduler App is a powerful tool designed to help you manage your tasks efficiently. It leverages various technologies such as Docker, Kubernetes, JWT, MongoDB, Next, Redux, Axios, GitHub Actions, and Nodemailer to provide a seamless scheduling experience.

![image](https://github.com/Primeshheshan/Scheduler-app/assets/60648856/84a73ade-aa80-4864-8d6c-5ec469ac7dd6)

- **[Features](#features)**
- **[Technologies Used](#technologies-used)**
- **[Getting Started](#getting-started)**
- **[Deployment](#deployment)**
- **[Contributing](#contributing)**
- **[License](#license)**


## Features

- **Task Management:** Create, update, and delete tasks with ease.
- **User Authentication:** Secure your app with JWT-based user authentication.
- **Real-time Updates:** Utilize Redux to ensure real-time updates across the app.
- **Containerization:** Dockerize your app for consistent deployment across different environments.
- **Orchestration:** Use Kubernetes for efficient container orchestration and scaling.
- **Database:** Store task and user data in a MongoDB database.
- **Automated Workflows:** Implement GitHub Actions for CI/CD pipelines.
- **Email Notifications:** Send task reminders and updates using Nodemailer.
- **Nginx:** Utilize Nginx as a reverse proxy server for routing.

## Technologies Used

- **Docker:** Containerization platform for packaging the app and its dependencies.
- **Kubernetes:** Container orchestration tool for automating deployment, scaling, and management.
- **JWT (JSON Web Tokens):** Secure method for user authentication and authorization.
- **Express:** Backend framework.
- **MongoDB:** NoSQL database for storing task and user data.
- **Next:** Next framework for frontend.
- **Redux:** State management library for maintaining app-wide state.
- **Axios:** Promise-based HTTP client for making API requests.
- **GitHub Actions:** Automate workflows for continuous integration and continuous deployment.
- **Nodemailer:** Send email notifications to users.
- **Nginx:** High-performance web server and reverse proxy server.

## Getting Started

Follow these steps to get the Scheduler App up and running on your local machine:

1. Clone this repository: `git clone https://github.com/Primeshheshan/Scheduler-app.git`
2. Navigate to the project directory: `cd scheduler-app`
3. Install dependencies for the frontend: `cd frontend && npm install`
4. Install dependencies for the backend: `cd backend && npm install`
5. Set up MongoDB and update the connection details in the backend configuration.
6. Start the backend server: `cd backend && npm start`
7. Start the frontend development server: `cd frontend && npm dev`
8. Add this environtment variables to your backend .env file
      1. DB_PASSWORD
      2. DB_USERNAME
      3. ACCESS_TOKEN_SECRET
      4. REFRESH_TOKEN_SECRET
      5. USER_EMAIL
      6. USER_EMAIL_PASSWORD
      7. TWILIO_ACCOUNT_SID
      8. TWILIO_AUTH_TOKEN
      9. TWILIO_SERVICE_SID

## Deployment

To deploy the Scheduler App, you can follow these steps:

1. Configure your Kubernetes cluster and set up the necessary secrets.
2. start minikube with this code to up kubernetes locally `minikube start --driver=docker
3. start kubernetes services with this code `minikube service <service name>`
4. Update the deployment configurations to use your container registry.
5. Apply the Kubernetes configurations: `kubectl apply -f=<deployment name>.yaml`
6. To autoscale the pods use this code `kubectl autoscale deployment <deployment name> --cpu-percent=50 --min=1 --max=10`
7. Set up GitHub Actions workflows for automated CI/CD.

## Contributing

We welcome contributions from the community! If you'd like to contribute to the Scheduler App, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to reach out to us at [primeshheshan@gmail.com](mailto:primeshheshan@gmail.com) for any questions or support related to the Scheduler App.
