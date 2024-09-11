// Purpose: Entry point for the server
const app = require('./index');
const port = 8080;

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
