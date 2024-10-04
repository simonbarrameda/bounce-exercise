# React App for NASA API Application

## Manual Installation

```bash
npm install
```

You can install the vite CLI using:

```bash
npm install -D vite
```

Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables (if needed)
```

*Note:* *Only environment variables prefixed with `VITE_` are exposed to vite-processed code. See [vite documentation](https://vite.dev/guide/env-and-mode.html)*

## Commands

Run the application locally:

```bash
npm run dev
```

Build for production.

```bash
npm run build
```

Locally preview the production build. Do not use this as a production server as it's not designed for it.

```bash
npm run preview
```

Docker

```bash
npm run docker
```

## Deploying to Static Site

**RENDER**

1. Create a [Render account](https://dashboard.render.com/register)

2. In the [Dashboard](https://dashboard.render.com/), click the New button and select Static Site.

3. Connect your GitHub/GitLab account or use a public repository.

4. Specify a project name and branch.

    * **Build command** `npm run build`
    * **Pulish Directory**: `dist`

5. Click **Create Static Site**.

    Your app should be deployed at `https://<PROJECTNAME>.onrender.com/`.

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Backend server host and port
VITE_API_URL=localhost:3000

# JWT Secret
VITE_JWT_SECRET=thisisasamplesecret
```

By default, any new commit pushed to the specified branch will automatically trigger a new deployment. [Auto-Deploy](https://render.com/docs/deploys#toggling-auto-deploy-for-a-service) can be configured in the project settings.

You can also add a [custom domain](https://render.com/docs/custom-domains) to the project.

## React + Vite Template

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
