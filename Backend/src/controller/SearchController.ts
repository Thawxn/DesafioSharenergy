import { Request, Response } from 'express';

import Costumers from '../models/Costumers';

class SearchController {
  async index(req: Request, res: Response) {
    const { name } = req.params;

    const respst = await Costumers.collection.findOne({
      name: name,
    });

    return res.status(200).json(respst);
  }
}

export default new SearchController();
