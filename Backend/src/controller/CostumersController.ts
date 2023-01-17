import { Request, Response } from 'express';
import * as Yup from 'yup';

import Costumers from '../models/Costumers';

class CostumersController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      phone: Yup.number().required().min(9),
      address: Yup.string().required(),
      cpf: Yup.number().required().min(11),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failure' });
    }

    const { name, email, phone, address, cpf } = req.body;
    const newCostumers = new Costumers({
      name,
      email,
      phone,
      address,
      cpf,
    });

    const result = await newCostumers.save();

    try {
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'failed to register customer' });
    }
  }

  async update(req: Request, res: Response) {
    const { name, email, phone, address, cpf } = req.body;
    const { id } = req.params;

    try {
      await Costumers.updateOne(
        { _id: id },
        {
          name,
          email,
          phone,
          address,
          cpf,
        },
      );
      return res.status(200).json({ msg: 'Successfully updated' });
    } catch {
      return res.status(400).json({ error: 'Failed to update' });
    }
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await Costumers.findByIdAndDelete({ _id: id });
      return res.status(200).json({ msg: 'Successfully deleted' });
    } catch {
      return res.status(400).json({ error: 'Failed to delete' });
    }
  }

  async index(req: Request, res: Response) {
    const respst = await Costumers.find();

    return res.status(200).json(respst);
  }
}

export default new CostumersController();
