const Student = require("../models/Student");
// scripts for student routes
const updateOldData = async (req, res) => {
  try {
    const updated = await Student.updateMany(
      { isDeleted: { $exists: false } },
      { isDeleted: false },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "No student found to update" });
    }
    res.status(200).json({ message: "Student data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating student data", error });
  }
};

const yearOld = async (req, res) => {
  try {
    const bulkupdate = [];
    const { id } = req.params;
    const students = await Student.find({ teacherId: id }).select("_id dob");
    for (let index = 0; index < students.length; index++) {
      const student = students[index];
      const studentDob = student.dob;
      const today = new Date();
      const dateOfBirth = new Date(studentDob);
      const currentAge = today.getFullYear() - dateOfBirth.getFullYear();
      bulkupdate.push({
        updateOne: {
          filter: { _id: student._id },
          update: { $set: { age: currentAge } },
        },
      });
    }
    const result = await Student.bulkWrite(bulkupdate, { ordered: false });

    res.status(200).send(" student age updated Successfully");
  } catch (error) {
    res.status(500).json({ message: "Error getting Student age", error });
  }
};





module.exports = { updateOldData, yearOld };
