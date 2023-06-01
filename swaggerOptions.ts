export const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Antonije",
          url: "",
          email: "ogistdipen@outlook.com",
        },
      },
      servers: [
        {
          url: "http://localhost:9000",
        },
      ],
    },
    apis: ["./controllers/*.ts"],
  };