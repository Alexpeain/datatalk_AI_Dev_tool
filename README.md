# Introduction to AI-Assisted Development: Django To-Do App

This project is a simple To-Do application built using the Django web framework as part of a homework assignment for the [AI Dev Tools Zoomcamp hosted by the DataTalksClub](https://github.com/DataTalksClub/ai-dev-tools-zoomcamp).

The primary goal of this exercise is to demonstrate how modern AI tools (such as ChatGPT, Claude, GitHub Copilot, Cursor, etc.) can accelerate and guide the application development process, even if you are unfamiliar with the underlying technologies like Python or Django.

## App Demo

![Django To-Do App Screenshot](./media/Screenshot%202025-11-26%20214421.png)

## Features

The application supports standard To-Do list functionality:

- **Create** new tasks with descriptions.
- **Edit** and **Delete** existing tasks.
- **Assign** due dates to tasks.
- **Mark** tasks as resolved/completed.

## Prerequisites

To run this project locally, you will need:

- **Python:** The core programming language used by Django.
- **`uv` (optional but recommended):** A modern, fast Python package manager and virtual environment creator. If you prefer `pip` and `venv`, those will work too.

## Getting Started

These instructions assume you are using `uv`. If you are using standard Python tools, the commands will be slightly different (e.g., `pip install -r requirements.txt` instead of `uv pip install -r requirements.txt`).

### 1. Clone the repository

````bash
git clone <repository_url>
cd <repository_folder_name>
````

2. Set up the environment and install dependencies

```bash
uv env create
uv activate
uv pip install -r requirements.txt
````

### 3. Apply database migrations

```bash
uv python manage.py migrate
```

### 4. Run the development server

```bash
uv python manage.py runserver
```

### 5. Access the application

Open your web browser and navigate to `http://localhost:8000` to view the To-Do application.

## Join the Community

If you're interested in learning how to leverage AI in your development workflow, I highly recommend checking out the [AI Dev Tools Zoomcamp GitHub page](https://github.com/DataTalksClub/ai-dev-tools-zoomcamp). You can also learn more about data-focused events and bootcamps on the main [DataTalksClub website](https://datatalks.club).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
