const db = require("../database/database");

const createUser = (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password || !age) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email);

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const result = db.prepare(`
      INSERT INTO users (name, email, password, age)
      VALUES (?, ?, ?, ?)
    `).run(name, email, password, age);

    res.status(201).json({
      message: "User registered successfully",
      userId: result.lastInsertRowid
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

const getUsers = (req, res) => {
    try {
        const users = db
            .prepare(`
                SELECT id, name, email, age
                FROM users
                ORDER BY id DESC
            `)
            .all();

        res.json(users);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const deleteUser = (req, res) => {
    try {
        const { id } = req.params;

        const result = db
            .prepare("DELETE FROM users WHERE id = ?")
            .run(id);

        if (result.changes === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    const result = db.prepare(`
        UPDATE users
        SET name = ?, email = ?, age = ?
        WHERE id = ?
    `).run(name, email, age, id);

    res.json({
        message: "User updated successfully"
    });
};

module.exports = {
    createUser,
    getUsers,
    deleteUser,
    updateUser
};