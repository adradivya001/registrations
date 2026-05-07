# Technical Documentation: Janmasethu API & AI Automation Strategy

**Version**: 1.0  
**Status**: Draft for Internal Review  
**Subject**: Transitioning to Level One (API-First) Architecture  

---

## 1. APIs Currently Working Manually
These APIs are functional and rely on direct user interaction via the frontend (button clicks, form submissions).

| Purpose | Endpoint | Manual Workflow |
| :--- | :--- | :--- |
| **User Onboarding** | `POST /user/register` | User fills out the registration form; frontend sends data to BE. |
| **Identity Verification** | `POST /user/login` | User enters credentials; frontend handles JWT storage. |
| **Health Profiling** | `POST /user/answers` | User completes a multi-step quiz; data is saved in bulk to the DB. |
| **Clinical Tools** | `POST /api/tools/due-date` | User inputs LMP date; UI displays calculated delivery date. |
| **Staff CRM** | `POST /api/leads` | Clinic staff manually enter lead details or update status in the dashboard. |

---

## 2. APIs That Do Not Require Automation at Present
These APIs are stable and are designed to be "stateless" tools or security-sensitive paths where automation adds unnecessary risk.

| Reason for Manual | Endpoint | Usage Description |
| :--- | :--- | :--- |
| **Third-Party Auth** | `GET /auth/google` | Requires browser-based redirect and user consent. |
| **Static Reference** | `GET /api/tools/safety` | A look-up table for food/medicine; no logic change needed. |
| **System Diagnostics** | `GET /` | Simple health check for server uptime monitoring. |
| **Stateless Logic** | `POST /api/tools/vax` | Generates a fixed 16-year schedule; output doesn't vary by context. |

---

## 3. APIs Planned for Future AI Automation
These APIs will be integrated with AI Agents to maintain the "Digital Twin" and drive proactive healthcare engagement.

### A. Journey Timeline Management
*   **Endpoint**: `POST /user/journey`
*   **Automation Scope**: Moving from user-triggered updates to **Time-Aware AI Agents**.
*   **AI Functionality**: The agent will calculate gestation weeks and autonomously update the user's stage (e.g., "1st Trimester" to "2nd Trimester") and trigger relevant content.

### B. Proactive CRM & Lead Management
*   **Endpoint**: `POST /api/leads/re-eng`
*   **Automation Scope**: **Lead Nurturing Agents**.
*   **AI Functionality**: Predictive analysis of lead engagement scores to trigger personalized follow-ups via WhatsApp if a lead hasn't responded to manual outreach.

### C. Knowledge Ingestion & Validation
*   **Endpoint**: `GET /api/scrape/blogs`
*   **Automation Scope**: **Autonomous Content Hub**.
*   **AI Functionality**: Scrapes trusted medical sources, validates medical accuracy using RAG, translates to Telugu, and inserts into the knowledge base automatically.

---

## 4. API Endpoint Documentation
Detailed specifications for core endpoints across all services.

| API Name | Endpoint URL | Method | Input Parameters | Expected Response | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **User Register** | `/user/register` | POST | `phone`, `password`, `name` | `{ "status": "success", "user_id": UUID }` | Manual |
| **Sakhi Chat** | `/sakhi/chat` | POST | `query`, `user_id`, `history` | `{ "response": "text", "sources": [] }` | Semi-Automated |
| **Journey Update** | `/user/journey` | POST | `stage_id`, `milestone` | `{ "new_stage": "string", "next_steps": [] }` | Future AI |
| **Lead Re-Engage**| `/api/leads/re-eng`| POST | `lead_id`, `strategy` | `{ "action_taken": "whatsapp_sent" }` | Future AI |
| **Scraper Trigger**| `/api/scrape/blogs`| GET | `source_id` (optional) | `{ "count_ingested": integer }` | Future AI |
| **Vaccination Tool**| `/api/tools/vax` | POST | `dob`, `child_name` | `{ "schedule": [ { "age": "X", "vax": "Y" } ] }` | Manual |
| **WhatsApp Webhook**| `/webhook` | POST | `from`, `body`, `type` | `HTTP 200 OK` | Semi-Automated |

---

## 5. Future AI Automation Roadmap
The transition strategy focuses on connecting standard REST APIs to specialized AI components:

*   **AI Agents**: Deployment of "Journey Coordinators" that call `/user/journey` and `/api/appt` autonomously.
*   **RAG Pipelines**: Enhancing `/sakhi/chat` and `/api/assistant` with deeper integration into the `sakhi_knowledge_hub`.
*   **Predictive Workflows**: Using `/api/ctrl/alerts` to detect drop-offs in user engagement and triggering `/v1/send-message` via an LLM to "win back" the user.
*   **Smart Validation**: Implementing an AI gatekeeper on `/api/scrape/blogs` to filter out non-medical "junk" content.

---

## 6. Output Summary
This document serves as the technical blueprint for the **Level One Architecture** shift. By decoupling the APIs from the frontend (moving from `AnimatedButton.tsx` to `BackgroundWorker.py`), the system transitions from a passive "Mirror" to an active "Digital Twin" capable of autonomous healthcare management.

---
**Report Prepared By**: Antigravity (AI Architect)  
**Authorized By**: Project Janmasethu Leadership
