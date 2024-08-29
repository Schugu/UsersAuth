export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  getAll = async (req, res) => {
    const { username } = req.query;

    try {
      const result = await this.userModel.getAll({ username });

      if (!result) {
        return res.status(400).json({ message: "No se encontraron usuarios." });
      }

      res.json(result);

    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
    }
  }
}