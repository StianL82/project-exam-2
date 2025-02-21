# Project-Exam-2

## Holidaze

![image](/public/images/screencapture-project-exam-2.png)

## Project Overview

In this project, we were tasked with developing the front-end for Holidaze, an accommodation booking platform. The goal was to create a dynamic and user-friendly experience for both customers and venue managers using React and approved frameworks. 😄

## Visit the page at:

[![Holidaze](/public/images/logo.png)](https://project-exam-2-stianl.netlify.app//)

## Description

The project involved building a modern front-end interface for a booking platform, which includes both a customer-facing side for browsing and booking venues, and an admin-facing side for managing venues and bookings. Features like user registration, venue management, and booking functionality were essential, with a focus on accessibility, responsiveness, and smooth user interaction.

### Required features:

For this project, we were tasked with implementing the following features:

**_Customer-Facing:_**

- View a list of venues
- Search for specific venues
- View a specific venue page with detailed information
- Access a calendar showing available booking dates for each - venue
- Register as a customer using a stud.noroff.no email
- Create and manage bookings at a venue
- View upcoming bookings

**_Admin-Facing:_**

- Register as a venue manager using a stud.noroff.no email
- Create and manage venues (add, update, delete venues)
- View and manage bookings for venues

**_General Features:_**

- User login/logout functionality
- Profile management with avatar updates
- Error handling for user actions and API interactions

## Built With

- HTML/CSS
- Bootstrap
- JavaScript
- REACT
- React Router
- Noroff API for fetching venue data and auth

## Getting Started

### Installing

Clone the repo:

```
git clone git@github.com/StianL82/project-exam-2
```

Install dependencies

```
npm install
```

## Run the project

Start the development server

```
npm start
```

## API Setup

This project uses the **Holidaze API** provided by Noroff. To interact with the API, you'll need to set up your API key.

1. **Create a `.env` file**: Copy the `.env.example` file to create a `.env` file in the root of the project:

```
  cp .env.example .env
```

2. Set your API key: Open the .env file and add your API key like this:

```
  REACT_APP_API_KEY=your-api-key-here
```

The API key will be automatically injected into the app and used for API requests.

[Link to Netlify-page](https://project-exam-2-stianl.netlify.app//)

### Contributing

This repo is not open to any contributions.

## Contact 📫

Feel free to contact me at stian.lilleng@gmail.com
