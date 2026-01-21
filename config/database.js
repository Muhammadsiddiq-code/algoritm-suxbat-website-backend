// require("dotenv").config();
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: "postgres",
//     logging: false,
//   }
// );

// module.exports = sequelize;









// require("dotenv").config();
// const { Sequelize } = require("sequelize");

// const isProduction = process.env.NODE_ENV === "production";

// const sequelize = isProduction
//   ? new Sequelize(process.env.DATABASE_URL, {
//       dialect: "postgres",
//       logging: false,
//       dialectOptions: {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false,
//         },
//       },
//     })
//   : new Sequelize(
//       process.env.DB_NAME,
//       process.env.DB_USER,
//       process.env.DB_PASSWORD,
//       {
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         dialect: "postgres",
//         logging: false,
//       }
//     );

// module.exports = sequelize;















require("dotenv").config();
const { Sequelize } = require("sequelize");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL topilmadi. Railway Variables ni tekshiring.");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Ulanishni tekshirish (start paytida)
(async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
})();

module.exports = sequelize;
