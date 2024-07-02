const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Read environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Read the HTML template
const templatePath = path.join(__dirname, 'index.html.template');
let htmlContent = fs.readFileSync(templatePath, 'utf8');

// Replace placeholders with actual values
htmlContent = htmlContent.replace('SUPABASE_URL_PLACEHOLDER', SUPABASE_URL);
htmlContent = htmlContent.replace('SUPABASE_ANON_KEY_PLACEHOLDER', SUPABASE_ANON_KEY);

console.log("URL, Key = ", SUPABASE_URL, SUPABASE_ANON_KEY)
console.log("HTMLContent = ", htmlContent);

// Write the output to index.html
const outputPath = path.join(__dirname, 'index.html');
fs.writeFileSync(outputPath, htmlContent);

console.log('index.html has been generated successfully.');
