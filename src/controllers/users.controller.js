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



  register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const result = await this.userModel.register({ username, email, password });

      if (!result) {
        return res.status(400).json({ message: "Error al registrarse." });
      }

      if (result.usernameExists) {
        return res.status(400).json({ message: `Ya existe un usuario con el username: ${username}` });
      }

      if (result.emailExists) {
        return res.status(400).json({ message: `Ya existe un usuario con el email: ${email}` });
      }


      res.json(result);

    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
    }
  }

  login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = await this.userModel.login({ username, password });

      if (!result) {
        return res.status(400).json({ message: "Error al iniciar sesión." });
      }

      if (result.userNotExists) {
        return res.status(400).json({ message: `No existe ningún usuario con el username: ${username}` });
      }

      if (result.notValid) {
        return res.status(400).json({ message: `Datos incorrectos.` });
      }

      res.json(result);

    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor.", error: error.message });
    }
  }

}