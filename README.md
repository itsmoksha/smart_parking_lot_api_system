# Smart Parking Lot API System

A centralized backend system for managing parking slot allocation, tracking vehicle entry/exit, and maintaining parking records.

## Features
- **Slot Management**: Initialize and view parking slots.
- **Nearest Slot Allocation**: Automatically assigns the nearest available slot (lowest slot number).
- **Vehicle Tracking**: Real-time monitoring of parked vehicles and availability.
- **Parking History**: Maintain logs of all vehicles that have used the parking lot.
- **Request Logging**: Middleware logs every API request (Method + Route).
- **Duplicate Prevention**: Prevents a vehicle from entering if it's already inside.
- **Duration Calculation**: Automatically calculates parking duration upon exit.

## Tech Stack
- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose**
- **Morgan** (Logging)
- **Dotenv** (Environment Variables)

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally (or use Atlas)

### Installation
1. Clone the repository (or extract files).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Create a `.env` file in the root directory.
   - Add your connection string and port:
     ```env
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/smart_parking
     ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Slot Management
- `POST /api/slots/initialize`: Initialize slots. Body: `{ "count": 10 }`
  ![Initializing Slots](screenshots/initialize_slots.png)
- `GET /api/slots`: View all slots.
- `GET /api/slots/available`: View currently available slots.

### Parking Operations
- `POST /api/parking/entry`: Register vehicle entry. Body: `{ "numberPlate": "ABC-1234" }`
  ![Vehicle Entry](screenshots/vehicle_entry.png)
- `POST /api/parking/exit`: Register vehicle exit. Body: `{ "numberPlate": "ABC-1234" }`
  ![Vehicle Exit](screenshots/vehicle_exit.png)
- `GET /api/parking/status`: View currently parked vehicles.
  ![Parking Status](screenshots/parking_status.png)
- `GET /api/parking/history`: View all parking records.
  ![Parking History](screenshots/parking_history.png)
- `GET /api/parking/vehicle/:numberPlate`: Search history by plate number.

### Maintenance
- `POST /api/parking/reset`: Reset all slots to available and clear history.

## Testing with Postman
1. Start the server.
2. Initialize slots using `POST /api/slots/initialize`.
3. Test Entry/Exit flows.
4. Verify results using Status and History endpoints.

