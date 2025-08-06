# InsightFlow Web Service

This is the initial scaffold for the InsightFlow Node.js/Express web-service.

## Features
- Data upload (CSV, Excel, etc.)
- Interactive visualizations
- User permissions management 
- Automated recommendations 
- API documentation

- Contextual chatbot with Retrieval-Augmented Generation (RAG) 

## Endpoints
- `POST /data/upload` — Upload data files
- `GET /visualizations/{dataset_id}` — View interactive charts
- `PUT /users/{id}/permissions` — Manage user permissions
- `GET /recommendations/{user_id}` — Get recommendations
- `GET /api/docs` — API documentation
- `POST /chat` — Chatbot endpoint with KB-augmented responses

## Getting Started
1. Install dependencies: `npm install`
2. Start the server: `npm start`

## Directory Structure
- `/routes` — Express route definitions
- `/controllers` — Route handlers
- `/models` — Data models
- `/kb.json` — Product knowledge base (FAQ)

## License
MIT

---

## Knowledge Base Retrieval & Contextual Chat

InsightFlow's chatbot uses Retrieval-Augmented Generation (RAG) to provide context-aware answers. When a user sends a message to `/chat`, the system:

1. Extracts keywords from the user's message.
2. Retrieves relevant Q&A pairs from `kb.json` using `controllers/kb.js`.
3. Appends the retrieved context to the prompt sent to Azure OpenAI.

### Example

**User message:**
```
How do I upload data?
```

**Retrieved KB context:**
```
Q: How do I upload data to InsightFlow?
A: You can upload data using the 'Upload' feature in the dashboard or via the /data API endpoint. Supported formats include CSV and Excel.
```

**Final prompt to LLM:**
```
Q: How do I upload data to InsightFlow?
A: You can upload data using the 'Upload' feature in the dashboard or via the /data API endpoint. Supported formats include CSV and Excel.
User: How do I upload data?
AI:
```

### Key Files
- `controllers/kb.js`: Implements keyword-based KB retrieval.
- `kb.json`: Contains product FAQs and info.
- `routes/chat.js`: Appends KB context to LLM prompt.

