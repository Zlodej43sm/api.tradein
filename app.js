const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routers = require("./routers");
const port = process.env.PORT;
const app = express();

require("./db");

app.use(cors());
app.use(helmet());
console.log();
app.use(morgan(process.env.LOGGER));
app.use(express.json());

for (const route in routers) {
  routers[route](app);
}

app.listen(port, () => {
  console.log( `Server running on port ${port}!` );
});
