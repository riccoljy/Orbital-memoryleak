const fs = require('fs');

// Read the HTML template file
fs.readFile('resetPassword/index.html', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading HTML file:', err);
    return;
  }

  // Replace placeholders with actual environment variables
  const html = data
    .replace('__SUPABASE_URL__', process.env.SUPABASE_URL)
    .replace('__SUPABASE_ANON_KEY__', process.env.SUPABASE_ANON_KEY);

  console.log("URL, KEY= ", process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

  // Write the modified HTML back to the file
  fs.writeFile('resetPassword/index.html', html, 'utf8', (err) => {
    if (err) {
      console.error('Error writing HTML file:', err);
      return;
    }
    console.log('HTML file updated successfully!');
  });
});
