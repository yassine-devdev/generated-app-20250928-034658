# Aetheris: The Multiverse SaaS Dashboard

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/yassine-devdev/generated-app-20250928-034658)

Aetheris is a futuristic, production-ready, multi-tenant SaaS dashboard designed for educational platforms. It features a sophisticated Role-Based Access Control (RBAC) system catering to five distinct user roles: Owner, School Admin, Teacher, Student, and Parent. The application's centerpiece is its unique and highly intuitive three-tiered navigation system, comprising a main RightSidebar, a contextual L1 Header, and a specific SubnavLeft. This architecture provides an information-dense yet uncluttered user experience. The UI is built with a stunning glassmorphism and skeuomorphism aesthetic, emphasizing clarity, depth, and interactivity through smooth animations and responsive layouts that adapt seamlessly from wide-screen desktops to mobile devices.

## ✨ Key Features

*   **Role-Based Access Control (RBAC):** Tailored dashboard experiences for different user roles (Owner, Admin, Teacher, etc.).
*   **Three-Tiered Navigation:** An intuitive and powerful navigation system with a RightSidebar, L1 Header, and SubnavLeft.
*   **Futuristic UI/UX:** A stunning glassmorphism and skeuomorphism aesthetic with smooth, physics-based animations.
*   **Fully Responsive:** Flawless layouts that adapt perfectly from large desktops to mobile devices.
*   **Stateful AI Backend:** Powered by Cloudflare Agents for persistent, stateful conversations and operations.
*   **Scalable Architecture:** Built on Cloudflare Workers and Pages for global performance and scalability.

## 🛠️ Technology Stack

*   **Framework:** React 18 + Vite
*   **Backend:** Hono on Cloudflare Workers
*   **Styling:** Tailwind CSS with `tailwindcss-animate`
*   **UI Components:** Shadcn/UI
*   **State Management:** Zustand
*   **Animations:** Framer Motion
*   **Icons:** Lucide React
*   **Language:** TypeScript
*   **Stateful AI:** Cloudflare Agents
*   **Platform:** Cloudflare Pages & Workers

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Bun](https://bun.sh/) installed on your machine.
*   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/aetheris-multiverse-dashboard.git
    cd aetheris-multiverse-dashboard
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

3.  **Set up environment variables:**
    Create a `.dev.vars` file in the root of the project for local development. You can copy the variables from `wrangler.jsonc`.
    ```ini
    # .dev.vars

    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"
    CF_AI_API_KEY="your-cloudflare-api-key"
    ```
    Replace the placeholder values with your actual Cloudflare AI Gateway credentials.

## 💻 Development

To start the local development server, which includes both the Vite frontend and the Wrangler worker, run:

```sh
bun run dev
```

This will start the Vite development server, typically on `http://localhost:3000`, with requests to `/api/*` automatically proxied to the local Wrangler server.

## ☁️ Deployment

This project is designed for seamless deployment to Cloudflare Pages.

1.  **Build the project:**
    ```sh
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    The `deploy` script in `package.json` handles both the frontend and worker deployment.
    ```sh
    bun run deploy
    ```

Alternatively, you can connect your GitHub repository to Cloudflare Pages for automatic CI/CD deployments.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/yassine-devdev/generated-app-20250928-034658)

## 📂 Project Structure

```
.
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components (including shadcn/ui)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and libraries
│   ├── pages/           # Page components for routing
│   ├── store/           # Zustand state management stores
│   ├── main.tsx         # Main application entry point
│   └── index.css        # Global styles and Tailwind directives
├── worker/              # Cloudflare Worker backend code
│   ├── agent.ts         # Core ChatAgent Durable Object class
│   ├── userRoutes.ts    # API route definitions
│   └── index.ts         # Worker entry point
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── wrangler.jsonc       # Cloudflare Wrangler configuration
```

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.