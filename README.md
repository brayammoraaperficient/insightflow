
# InsightFlow Web Service

This is a Node.js/Express web-service for InsightFlow, supporting endpoints for data upload, visualization, user permissions, recommendations, and API docs.

---

## Project Objectives & Deliverables

This project was developed following an 8-part workflow:

### Part 1: User Stories & MVP Definition
- Clear, actionable user stories mapped to REST endpoints.
- See [`user_stories.md`](./user_stories.md) for 5 stories, each with persona, story, benefit, acceptance criteria, and endpoint.

### Part 2: Project Kick-off & Scaffolding
- Bootstrapped with Node.js/Express.
- Directory layout, sample routes, and initial README generated.
- Initial commit with AI-generated message.

### Part 3: Authentication & Session Management
- User registration and login endpoints (`POST /users/register`, `POST /users/login`).
- JWT issued on login.
- `/chat` endpoint protected by auth middleware.

### Part 4: Building the Core Chat API
- `/chat` endpoint accepts user messages and returns AI-generated replies.
- Chatbot persona is polite and customer-focused.
- Handles errors and rate limits gracefully.

### Part 5: Simulating RAG (Knowledge Base Retrieval)
- JSON knowledge base (`kb.json`) of FAQs/product docs.
- Retrieval logic in `controllers/kb.js` fetches relevant KB entries.
- Context appended to LLM prompt in `routes/chat.js`.

### Part 6: Automated Testing
- Unit/integration tests mock LLM, auth flows, and KB retrieval.
- Positive/negative cases covered (see `tests/`).
- Runnable via `npm test`.

### Part 7: CI/CD Pipeline Setup
- Automated build, test, and deploy via GitHub Actions (`.github/workflows/ci.yml`).
- Docker image build and push to registry.

### Part 8: Cloud Deployment & Env Configuration
- Kubernetes manifests (`k8s-secret.yaml`, `k8s-deployment.yaml`) for cloud deployment.
- Environment variables for API keys and KB path.
- Cloud deployment to Azure AKS not completed due to quota limits; configs and instructions included.

---

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

## Environment Variables
Set these in `.env` or via Kubernetes secrets:
- `AZURE_OPENAI_API_KEY`
- `AZURE_OPENAI_ENDPOINT`
- `AZURE_OPENAI_DEPLOYMENT`
- `KB_PATH` (default: `/app/kb.json`)

## Deployment

### Kubernetes
Deployment configs are provided:
- `k8s-secret.yaml` — Secrets for API keys and endpoint
- `k8s-deployment.yaml` — Deployment and service manifest

> **Note:** Cloud deployment to Azure AKS could not be completed due to quota limitations. All configs and instructions are included for future deployment.

### Docker
A `Dockerfile` is included for containerization.

## Live Endpoint
> The `/chat` endpoint is ready for cloud deployment, but a live URL is not available due to Azure resource limits.


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

## License
MIT

---

