# Deploy to Render - Step by Step Guide

## Quick Deployment Steps

### 1. Prepare Your Repository
- Push your code to GitHub (or connect your Replit project to GitHub)
- Make sure all your files are committed

### 2. Create Render Account
- Go to [render.com](https://render.com) and sign up
- Connect your GitHub account

### 3. Deploy Database First
1. In Render dashboard, click "New +" → "PostgreSQL"
2. Choose a name like "customer-segmentation-db"
3. Select the free plan
4. Click "Create Database"
5. **Copy the External Database URL** (you'll need this)

### 4. Deploy Web Service
1. Click "New +" → "Web Service"
2. Connect your repository
3. Configure these settings:
   - **Name**: `customer-segmentation-dashboard`
   - **Environment**: `Node`
   - **Build Command**: `npm install --include=dev && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 5. Set Environment Variables
In the web service settings, add:
- **Key**: `DATABASE_URL`
- **Value**: Paste the database URL from step 3

### 6. Deploy!
- Click "Create Web Service"
- Render will build and deploy your app
- You'll get a URL like: `https://your-app-name.onrender.com`

## Alternative: Using render.yaml (Automatic)

I've created a `render.yaml` file in your project. With this file:

1. Push to GitHub
2. Go to Render dashboard
3. Click "New +" → "Blueprint"
4. Connect your repo - Render will read the yaml file and set everything up automatically!

## Important Notes

- **Free tier limitations**: 
  - Database: 1GB storage, 97 connection limit
  - Web service: Spins down after 15 minutes of inactivity
  - Takes ~30 seconds to spin back up

- **Database migration**: After first deployment, you may need to run:
  ```bash
  npm run db:push
  ```
  
- **Custom domain**: You can add your own domain in the service settings

## Troubleshooting

- If build fails, check the build logs in Render dashboard
- Make sure your DATABASE_URL is correctly set
- Verify all dependencies are in package.json (not just devDependencies)

Your dashboard will be live at your Render URL within 5-10 minutes of deployment!