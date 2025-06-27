// index.js
import app from './app.js';
import connectDB from './db/db.config.js';

const PORT = process.env.PORT || 5005;
connectDB().then(() => {
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
}
).catch((err) => {
  console.error('❌ Failed to connect to the database:', err);
  process.exit(1);
});

