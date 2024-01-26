const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.db_cnn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    //This line is to internally determine the connection to the database is established
    console.log("Db online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar base de datos");
  }
};

module.exports = {
  dbConection,
};
