const jsonServer = require("json-server");
const server = jsonServer.create();
const jsonServerPort = 8095;

server.listen(jsonServerPort, () => {
  console.log(
    `Your website is running on port: http://localhost:${jsonServerPort}`
  );
});
