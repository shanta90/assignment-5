# GitHub Issues Tracker

A lightweight frontend project to browse and manage GitHub-style issues with a clean, responsive dashboard UI.

## Project Overview

This project includes a simple login page and an issue dashboard.  
After login, issues are loaded from a remote API. Users can filter by status, search by keyword, and view issue details in a modal.

## Screenshot

![GitHub Issues Tracker Preview](assets/project-preview.png)

If needed, you can also export additional screens from `GitHub Issues Tracker.fig`.

## Main Technologies

- HTML5
- JavaScript (Vanilla ES6+)
- Tailwind CSS (CDN)
- Font Awesome (CDN)
- Google Fonts (Inter)
- REST API (`fetch`)
- Browser `localStorage` (auth state)

## Main Features

- Demo login system (default: `admin` / `admin123`)
- Issue list fetched from API
- Tab filter: All / Open / Closed
- Real-time search (title, description, labels)
- Issue statistics (total, open, closed)
- Issue details modal
- Responsive UI (desktop + mobile)

## Dependencies

This project uses CDN-based dependencies (no `npm install` required):

- Tailwind CSS: [https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)
- Font Awesome 6.4.0: [https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css)
- Google Font Inter: [https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap)

## Run Locally

### Option 1: Directly run

1. Clone the repository:
   ```bash
   git clone https://github.com/shanta90/assignment-5.git
   ```
2. Go to the project folder:
   ```bash
   cd assignment-5
   ```
3. Open `index.html` in your browser.

### Option 2: VS Code Live Server (recommended)

1. Open the project in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and select **Open with Live Server**.

## Live and Relevant Links

- Repository: [https://github.com/shanta90/assignment-5](https://github.com/shanta90/assignment-5)
- API Base URL: [https://phi-lab-server.vercel.app/api/v1/lab](https://phi-lab-server.vercel.app/api/v1/lab)
- Issues Endpoint: [https://phi-lab-server.vercel.app/api/v1/lab/issues](https://phi-lab-server.vercel.app/api/v1/lab/issues)
- Design File: `GitHub Issues Tracker.fig`
- Live Demo: [https://shanta90.github.io/assignment-5/](https://shanta90.github.io/assignment-5/)

## Demo Credentials

- Username: `admin`
- Password: `admin123`