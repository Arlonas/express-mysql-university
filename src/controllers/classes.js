const { query } = require("../database");

const classControllers = {
  getClasses: async (req, res, next) => {
    try {
      const sql = `SELECT * FROM classes;`;

      const dbResult = await query(sql);

      return res.status(200).json({
        message: "Find classes",
        result: dbResult,
      });
    } catch (err) {
      next();
    }
  },
  getStudentByClassId: async (req, res, next) => {
    try {
      const { classId } = req.params;
      const sql = `
      SELECT * FROM class_student as cs
      JOIN students as s ON s.id = cs.student_id
      WHERE cs.class_id = ?;
      `;
      const replacements = [classId];
      const result = await query(sql, replacements);
      return res.status(201).json({
        message: "Find students",
        result ,
      });
    } catch (err) {
      next();
    }
  },
  createClass: async (req, res, next) => {
    try {
      const { class_name, lecturer_id } = req.body;

      const sql = `INSERT INTO classes VALUES (0, ?, ?)`;

      const replacements = [class_name, lecturer_id];

      await query(sql, replacements);

      return res.status(201).json({
        message: "Created class",
      });
    } catch (err) {
      next();
    }
  },
  editClassById: async (req, res, next) => {},
  deleteClassById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const sql = `DELETE FROM classes WHERE id = ?`;

      await query(sql, [id]);

      return res.status(200).json({
        message: "Deleted class",
      });
    } catch (err) {
      next();
    }
  },
};

module.exports = classControllers;
