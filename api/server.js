import './app.js'
const cors = require('cors');
const app = express();

// Allow all origins for development, restrict in production as needed
app.use(cors());
