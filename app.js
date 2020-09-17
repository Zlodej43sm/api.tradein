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
app.use(express.json());
app.use(morgan(process.env.LOGGER));
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

for (const route in routers) {
  routers[route](app);
}

app.listen(port, () => {
  console.log( `Server running on port ${port}!` );
});
