const mongoose = require("mongoose");
const transporter = require("../config/mailer");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  rollNo: String,
  semester: Number,
  department: String,
  password: String,
  image: String,
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });


studentSchema.post("save", (doc) => {
  transporter.sendMail({
    from: '"Student System" <yourmail@gmail.com>',
    to: doc.email,
    subject: "Student Registration Successful",
    html: `
        <h2>Welcome ${doc.name}</h2>
        <p>You have been successfully registered.</p>
        <p><b>Password:</b> ${doc.password}</p>
        <p><b>Roll No:</b> ${doc.rollNo}</p>
        <p><b>Department:</b> ${doc.department}</p>
        <br/>
        <p>Regards,<br/>Student Management System</p>
      `,
  });
});

module.exports = mongoose.model("Student", studentSchema);
