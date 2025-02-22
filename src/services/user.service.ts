import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { Like } from "typeorm";

export const s_get_all_users = async (req: Request, res: Response) => {
  return await User.find();
};

export const s_get_user_by_id = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id: parseInt(id) } });
  return user;
};

export const s_create_User = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await User.save({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: password.toLowerCase(),
  });

  return user;
};

export const s_search_user = async (req: Request, res: Response) => {
  const { name } = req.body;
  const user = await User.find({ where: { name: Like(`%${name}%`) } });
  return user;
};

export const s_delete_user = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.delete(id);
  return user;
};

export const s_update_user = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: Partial<User> = {};

  if (req.body.name) {
    updateData.name = req.body.name.toLowerCase();
  }
  if (req.body.email) {
    updateData.email = req.body.email.toLowerCase();
  }
  if (req.body.password) {
    updateData.password = req.body.password.toLowerCase();
  }

  const user = await User.update(id, updateData);
  const updatedUser = await User.findOne({ where: { id: parseInt(id) } });
  return { user, updatedUser };
};
