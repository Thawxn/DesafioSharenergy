import { Schema, model, connection } from 'mongoose';

type UserType = {
  userName: string;
  password: string;
};

const schema = new Schema<UserType>({
  userName: String,
  password: String,
});

const modelName = 'User';

export default connection && connection.models[modelName]
  ? connection.models[modelName]
  : model<UserType>(modelName, schema);
