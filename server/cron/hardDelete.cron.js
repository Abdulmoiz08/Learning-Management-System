const cron = require("node-cron");
const Student = require("../models/Student");

cron.schedule(" 0 0 * * * ", async () => {
  try{
   const result =  await Student.deleteMany({ isDeleted: true });
   console.log(result)
  }catch(err){
    console.log("cron job error",err.message);
  }
});
