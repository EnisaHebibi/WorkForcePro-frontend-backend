module.exports = function (server) {
  const { readLastUsedDepartmentId } = require("../utils");

  let departmentsIdCounter = readLastUsedDepartmentId();
  const jsonServer = require("json-server");
  const router = jsonServer.router("db.json");

  //endpoint=create/update department

  server.post("/api/departments", (request, response) => {
    const requestBody = request.body;

    if (
      requestBody.name === undefined ||
      requestBody.name === null ||
      requestBody.name.trim() === ""
    ) {
      return response
        .status(403)
        .json({ message: "Name of department must be provided!" });
    }

    if (requestBody.id === undefined) {
      console.log("debugging");
      let departmentId = ++departmentsIdCounter;
      const newDepartment = {
        id: departmentId,
        name: requestBody.name,
        employee_list: [],
      };

      const departmentsData = router.db.get("departments").value();
      departmentsData.push(newDepartment);
      router.db.set("departments", departmentsData).write();

      const lastUsedId = router.db.get("lastUsedId").value();
      lastUsedId.departmentId = departmentsIdCounter;
      router.db.set("lastUsedId", lastUsedId).write();

      response.status(203).json(newDepartment);
    } else {
      const departmentData = router.db.get("departments").value();
      const departmentId = parseInt(requestBody.id, 10);
      const index = departmentData.findIndex(
        (dept) => dept.id === departmentId
      );

      if (index === -1) {
        return response.status(404).json({ message: "Department not found" });
      } else {
        departmentData[index] = {
          ...departmentData[index],
          ...requestBody,
        };

        router.db.set("departments", departmentData).write();
        response.json(departmentData[index]);
      }
    }
  });
};
