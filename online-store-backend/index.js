const app = require("./app");
const { PORT_NUMBER } = require("./utils/config");
const logger = require("./utils/logger");

app.listen(PORT_NUMBER, () => logger.info(`App listening on port ${PORT_NUMBER}`));
