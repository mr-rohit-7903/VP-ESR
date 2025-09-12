# **Room Booking Timeline \- API Documentation**

Welcome\! This document provides all the necessary information for a frontend developer to set up, use, and understand the Room Booking Timeline API.

The backend is built with Node.js, Express, and MongoDB.

## **1\. Initial Setup**

Follow these steps to get the backend server running on your local machine.

#### **Step 1: Clone the Repository**

Clone this project to your local machine.

#### **Step 2: Install Dependencies**

Navigate into the project directory and install the required packages.

cd room-booking-backend  
npm install

#### **Step 3: Create and Configure the .env File**

Create a file named .env in the root of the project. This file will store your database connection string. Copy the following into it and replace the placeholder with your actual MongoDB URI.

\# .env  
MONGO\_URI=mongodb+srv://\<user\>:\<password\>@\<cluster\>/\<database\>?retryWrites=true\&w=majority  
PORT=5001

#### **Step 4: Start the Server**

Run the following command to start the development server. It will automatically restart whenever you make changes to the code.

npm run dev

If everything is set up correctly, you will see the following message in your terminal:  
🚀 Server running on port 5001  
The API is now ready to receive requests at http://localhost:5001.

## **2\. API Endpoints**

The API has two main endpoints for managing bookings.

### **Get Bookings by Date**

This endpoint fetches all the bookings for a specific calendar date. This is used to display the "filled" slots on the timeline view.

* **URL:** /api/bookings  
* **Method:** GET  
* **Query Parameter:**  
  * date (required): The date you want to fetch bookings for, in YYYY-MM-DD format.

#### **Example Request:**

GET http://localhost:5001/api/bookings?date=2025-09-15

#### **Success Response (200 OK):**

The API will return a JSON array of booking objects for that day. If there are no bookings, it will return an empty array \[\].

\[  
    {  
        "\_id": "6323a7b1c3e4f3a4e9a1b2c3",  
        "name": "Daksh Yadav",  
        "title": "Technology Coordinator",  
        "description": "Brief description of the meeting purpose",  
        "startTime": "2025-09-15T09:00:00.000Z",  
        "endTime": "2025-09-15T12:00:00.000Z",  
        "room": "esr",  
        "createdAt": "2025-09-15T18:30:41.888Z",  
        "updatedAt": "2025-09-15T18:30:41.888Z"  
    },  
    {  
        "\_id": "6323a7c5c3e4f3a4e9a1b2c4",  
        "name": "Jane Doe",  
        "title": "Project Manager",  
        "description": "Weekly sync-up",  
        "startTime": "2025-09-15T14:00:00.000Z",  
        "endTime": "2025-09-15T15:00:00.000Z",  
        "room": "vp",  
        "createdAt": "2025-09-15T18:31:01.123Z",  
        "updatedAt": "2025-09-15T18:31:01.123Z"  
    }  
\]

### **Create a New Booking**

This endpoint creates a new booking after validating the data and checking for any scheduling conflicts.

* **URL:** /api/bookings  
* **Method:** POST  
* **Body:** raw (JSON)

#### **Request Body Structure:**

The request body must be a JSON object with the following fields:

| Field | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| name | String | Yes | The full name of the person booking the room. |
| title | String | Yes | The job title or position of the person. |
| room | String | Yes | The name of the room. Must be exactly "ESR Room" or "VP Room". |
| date | String | Yes | The date of the booking in YYYY-MM-DD format. |
| startTime | String | Yes | The start time of the booking in 24-hour HH:MM format. |
| endTime | String | Yes | The end time of the booking in 24-hour HH:MM format. |
| description | String | No | An optional, brief description of the meeting's purpose. |

#### **Example Request Body:**

{  
  "name": "Roshil Singh",  
  "title": "Lead Developer",  
  "room": "ESR Room",   
  "date": "2025-09-16",  
  "startTime": "11:00",  
  "endTime": "12:30",  
  "description": "Code review session"  
}

#### **Success Response (201 Created):**

If the booking is created successfully, the API will return the complete booking object that was just saved to the database.

{  
    "\_id": "6323a8d9c3e4f3a4e9a1b2c5",  
    "name": "Roshil Singh",  
    "title": "Lead Developer",  
    "description": "Code review session",  
    "startTime": "2025-09-16T11:00:00.000Z",  
    "endTime": "2025-09-16T12:30:00.000Z",  
    "room": "esr",  
    "createdAt": "2025-09-15T18:35:37.456Z",  
    "updatedAt": "2025-09-15T18:35:37.456Z"  
}

#### **Error Responses:**

* **400 Bad Request** (e.g., missing or invalid fields):  
  {  
      "message": "Missing required fields"  
  }

* **409 Conflict** (time slot is already taken):  
  {  
      "message": "Time slot is already booked for this room. Please choose a different time."  
  }

## **3\. Important Notes for Frontend**

* **Date & Time Handling:** The API expects date, startTime, and endTime as separate strings. The backend is responsible for combining them into full UTC Date objects. All dates returned from the API (like startTime and createdAt) will be in UTC format. Your frontend will need to handle the conversion to the user's local timezone for display.  
* **Room Names:** The room field in the **request body** is case-sensitive and must be one of the two allowed user-friendly values: "ESR Room" or "VP Room". The backend will convert these to "esr" and "vp" before saving. The frontend should use a dropdown or select input to ensure valid data is sent.