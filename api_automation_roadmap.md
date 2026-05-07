# API Automation Roadmap: Manual vs. AI-Driven

**Project**: Janmasethu & Sakhi Ecosystem  
**Goal**: Define the boundary between Human-Centric (Manual) operations and AI-Agent (Automated) operations.

---

## 1. Manual APIs (Human-Centric)
These APIs require human input, identity verification, or individual decision-making. They do **not** need automation at this stage as they form the foundation of user-initiated data.

| Endpoint | Category | Why it remains Manual? |
| :--- | :--- | :--- |
| `/user/register` | REST | Requires a real human to provide their personal identity. |
| `/user/login` | REST | Requires human credentials (JWT/OAuth) for security. |
| `/auth/google` | REST | Depends on external OAuth2 handshakes (browser-based). |
| `/user/answers` | REST | Captures specific personal health data from onboarding quizzes. |
| `/api/tools/due-date`| Logic | A utility tool used by a human to calculate their specific timeline. |
| `/api/tools/vax` | Logic | A utility used by parents to generate their child's schedule. |
| `/api/tools/safety` | REST | A reference library for humans to check food/medication safety. |

---

## 2. Intelligence Layer (AI-Powered Now)
These APIs are already "Automated" in their logic but currently serve human requests.

| Endpoint | Category | Current Role |
| :--- | :--- | :--- |
| `/sakhi/chat` | AI | Processes natural language to provide medical advice. |
| `/api/assistant` | AI | Helps clinic staff search through large datasets via chat. |
| `/api/knowledge-hub/rec` | AI/Logic | Automatically picks the best content for the user. |

---

## 3. Future AI Automation (Level One Transition)
These APIs are the primary targets for the **Digital Twin Agents**. They will eventually run in the background without any frontend interaction.

| Endpoint | Automation Goal | Future Agent Behavior |
| :--- | :--- | :--- |
| `/user/journey` | **Autonomous Progress** | An agent will call this to advance a user (e.g., from "Pregnant" to "Postpartum") based on calendar dates. |
| `/api/leads/re-eng` | **Proactive CRM** | An AI "Sales Agent" will trigger this to follow up with users who haven't interacted in 7 days. |
| `/api/ctrl/alerts` | **Anomaly Detection** | A "Guardian Agent" will monitor this to alert staff if a user’s medical data shows risk. |
| `/api/scrape/blogs` | **Knowledge Ingestion** | A "Librarian Agent" will run this daily to keep the AI's medical knowledge updated. |
| `/v1/send-message` | **Outbound Outreach** | Used by agents to initiate WhatsApp conversations for check-ins or reminders. |
| `/api/appt` | **Follow-up Booking** | An AI agent will book follow-up slots automatically based on a doctor's recommendation in the chat. |

---

## 4. Execution Strategy
1.  **Phase 1 (Current)**: Keep `Manual` APIs as is. Continue using `Intelligence` APIs via the frontend.
2.  **Phase 2 (Immediate)**: Move `Journey` and `Leads` triggers from the UI buttons to the Backend Cron Service.
3.  **Phase 3 (Future)**: Deploy dedicated Python Agents that use **Service Accounts** to call these APIs directly, completing the "Digital Twin" autonomy.

---
**Prepared By**: Antigravity AI  
**Reference**: [api_first_architecture_transition.md.resolved](file:///c:/Users/adrad/.gemini/antigravity/brain/4e76d179-fd61-4ca9-8075-dfa2aead4bc5/api_first_architecture_transition.md.resolved)
