const mongoose = require("mongoose");
const uri = "";
function connect() {
  const options = { useNewUrlParser: true };
  mongoose.connect(uri, options).then(
    () => {
      console.log("Database connection is established!");
    },
    (err) => {
      console.log("Error connecting to Database instance due to: ", err);
    }
  );
}
module.exports = connect;
