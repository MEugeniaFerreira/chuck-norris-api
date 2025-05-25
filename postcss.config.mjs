/** @type {import('tailwindcss').Config} */
const config = {
  
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;


// configuration is exported as a default export so it can be imported elsewhere
// ES lint usually requires a default export for configuration files or it will throw an error
// It is not recommended to disable this rule globally since it helps to identify unclear exports