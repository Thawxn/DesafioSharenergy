import { Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req: Request, res: Response) {
    const { userName, password } = req.body;

    // Verificando se esse UserName existe
    const user = await User.collection.findOne({
      userName: userName,
    });

    if (!user) {
      return res.status(401).json({ erro: 'Invalid Username' });
    }

    // Verificando se a senha bate
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ erro: 'Invalid Password' });
    }

    try {
      const token = Jwt.sign({ id: user._id }, authConfig.secret, {
        expiresIn: authConfig.expireIn,
      });

      return res.status(200).json({
        userName,
        token,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Registration error, please try again later' });
    }
  }
}

export default new SessionController();
