# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. The app is built with TypeScript, React, and Vite.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Getting Started

### Install Dependencies

After cloning the repository, navigate to the app folder:

```bash
cd AWS/app
```

Install necessary dependencies using npm:

```bash
npm install
```

### Running the Development Server

To start the development server:

```bash
npm start
```

This will run the app in development mode.

### Building the Application

To build the application for production:

```bash
npm run build
```

Once the build is complete, navigate to the `AWS/app/build/index.html` file. You'll need to manually remove the forward slash `/` before `assets` in both:

- the `src` attribute of the `<script type="module">` tag
- the `href` attribute of the `<link rel="stylesheet">` tag

This ensures that the correct path to assets is applied in the build.

### Deploying Changes

After making the changes to the asset paths, commit and push your changes to the repository:

```bash
git add .
git commit -m "Update build and fix asset paths"
git push
```

Your changes will now be deployed.

### Documentation

You can find the documentation by opening the `AWS/app/docs/index.html` file in your browser.

### Changing the Server IP Address

If the server IP address changes, you need to update the React application. Open the `AWS/app/src/components/Config.ts` file and modify the `ipUrl` to the new IP address.

### Styling

CSS files for creating styles can be found in the `AWS/app/src/styles` folder.

### TypeScript and ESLint Setup

This project is set up with TypeScript. Ensure that you have TypeScript installed and correctly configured for your environment.

#### Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` with `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list.

### Backend Access

For access to the backend files and server documentation, please contact Ethan Ayari at `ethan.ayari@lasp.colorado.edu`.
