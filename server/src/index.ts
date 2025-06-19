// import "reflect-metadata";
// import cors from "cors";
// import express from "express";
// import { createConnection } from "typeorm";
// import ormconfig from "./ormconfig";
// import logger from "./loggers/logger";
// import { ApolloServer } from "apollo-server-express";

// const app = express();
// const PORT = 4000;

// app.use(cors());

// logger.info("Starting server...");

// createConnection(ormconfig)
//   .then(async () => {
//     logger.info("Connected to the database");

//     const server = new ApolloServer({
//       typeDefs,
//       resolvers,
//     });

//     await server.start();

//     server.applyMiddleware({ app, path: "/graphql" });

//     app.listen(PORT, () => {
//       logger.info(`Server is running on http://localhost:${PORT}/graphql`);
//     });
//   })
//   .catch((error) => {
//     logger.error("Error connecting to the database", error);
//   });
