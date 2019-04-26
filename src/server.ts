import app from './app';

const port = 8080;

app.listen(port, () => {
  console.log(`Express server listing on port ${port}`);
});
