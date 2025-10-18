# Space Events Tracker

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/framer%20motion-%230055FF.svg?style=for-the-badge&logo=framer&logoColor=white)

A sleek, responsive web application to track upcoming space events like launches, ISS passes, and meteor showers. Features a dark-space theme, search and filter functionality, and detailed event information in a modal view.

![Space Events Tracker Screenshot](https://storage.googleapis.com/aistudio-project-marketplace-public-assets/space-events-tracker/screenshot.png)

## ✨ Features

- **Live Event Data**: Fetches real-time upcoming launch data from [The Space Devs API](https://ll.thespacedevs.com/2.2.0/docs).
- **Interactive Grid Layout**: Displays events in a clean, responsive grid of cards.
- **Live Countdown**: Each event card features a real-time countdown to launch.
- **Powerful Filtering**: Instantly search by event name/location or filter by event type.
- **Detailed Modal View**: Click on any event to see more details, including mission description, agency, and vehicle information.
- **Stunning UI/UX**: A modern dark-space theme with smooth animations powered by Framer Motion.
- **Fully Responsive**: Designed to look great on all devices, from mobile phones to desktops.

## 🚀 Tech Stack

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via CDN)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Source**: [The Space Devs API](https://ll.thespacedevs.com/2.2.0/docs)

This project is built as a frontend-only application and uses ES Modules with import maps, requiring no local build step.

## Local Development

To run this project locally, you'll need a simple local server to handle module imports correctly.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/space-events-tracker.git
    cd space-events-tracker
    ```

2.  **Serve the `index.html` file:**
    Since this project uses modern web features like import maps and does not have a build step, you just need to serve the files. The easiest way is with the `serve` package.

    If you don't have `serve`, install it globally:
    ```bash
    npm install -g serve
    ```

    Then, run it in the project directory:
    ```bash
    serve .
    ```
    The application will be available at the local address provided by the server (usually `http://localhost:3000`).

    Alternatively, you can use a VSCode extension like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

## ✍️ Author

- **Mugunth**

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
