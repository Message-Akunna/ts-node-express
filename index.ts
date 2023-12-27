import express from "express";
//
import db from "./models";
//
import { users } from "./seeders/users";
import { projects } from "./seeders/projects";
import { projectAssignments } from "./seeders/projectAssignments";

// const createProjectsAssignments = () => {
//   projectAssignments.map((projectAssignment) => {
//     db.ProjectAssignment.create(projectAssignment);
//   });
// };

// createProjectsAssignments();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  db.User.findAll({
    include: {
      model: db.Project,
    },
  })
    .then((result: object) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.json(err).status(401);
    });
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Garment Factory running on PORT ${port}`);
  });
});
