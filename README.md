# InsightFlow Web Service

This is the initial scaffold for the InsightFlow Node.js/Express web-service.

## Features
- Data upload (CSV, Excel, etc.)
- Interactive visualizations
- User permissions management
- Automated recommendations
- API documentation

## Endpoints
- `POST /data/upload` — Upload data files
- `GET /visualizations/{dataset_id}` — View interactive charts
- `PUT /users/{id}/permissions` — Manage user permissions
- `GET /recommendations/{user_id}` — Get recommendations
- `GET /api/docs` — API documentation

## Getting Started
1. Install dependencies: `npm install`
2. Start the server: `npm start`

## Directory Structure
- `/routes` — Express route definitions
- `/controllers` — Route handlers
- `/models` — Data models

## License
MIT

