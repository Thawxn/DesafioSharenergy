import { Schema, model, connection, Model } from 'mongoose';

type CostumersType = {
  name: string;
  email: string;
  phone: number;
  address: string;
  cpf: number;
};

const schema = new Schema<CostumersType>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  cpf: { type: Number, required: true },
});

const modelName = 'Costumer';

const userModel =
  connection && connection.models[modelName]
    ? (connection.models[modelName] as Model<CostumersType>)
    : model<CostumersType>(modelName, schema);

export default userModel;
