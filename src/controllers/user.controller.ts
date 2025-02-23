import { Request, Response } from "express";
import {
  s_create_User,
  s_delete_user,
  s_get_all_users,
  s_get_user_by_id,
  s_search_user,
  s_update_user,
} from "../services/user.service";
import { validationResult } from "express-validator";

export const all_users = async (req: Request, res: Response) => {
  try {
    const users = await s_get_all_users(req, res);
    if (users.length === 0) {
      res.status(200).json({
        error: true,
        message: "No users found",
      });
      return;
    }
    res.status(200).json({
      error: false,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export const get_user_by_id = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: true,
      errors: errors.array(),
      message:
        "id is required and must be a number between 1 and 15 characters",
    });
    return;
  }

  try {
    const user = await s_get_user_by_id(req, res);
    if (!user) {
      res.status(404).json({
        error: true,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      error: false,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export const create_user = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        error: true,
        errors: errors.array(),
        message: "there are errors in the request",
      });
      return;
    }

    const user = await s_create_User(req, res);
    if (!user) {
      res.status(400).json({
        error: true,
        message: "User not created",
      });
      return;
    }
    res.status(201).json({
      error: false,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export const search_user = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: true,
      errors: errors.array(),
      message: "Name is required for search",
    });
    return;
  }

  try {
    const user = await s_search_user(req, res);
    if (!user) {
      res.status(404).json({
        error: true,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      error: false,
      message: "User found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export const delete_user = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: true,
      errors: errors.array(),
      message:
        "id is required and must be a number between 1 and 15 characters",
    });
    return;
  }

  try {
    const user = await s_delete_user(req, res);
    if (!user) {
      res.status(404).json({
        error: true,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      error: false,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export const update_user = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        error: true,
        errors: errors.array(),
        message:
          "id is required and must be a number between 1 and 15 characters",
      });
      return;
    }

    const { user, updatedUser } = await s_update_user(req, res);
    if (!user) {
      res.status(404).json({
        error: true,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      error: false,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};
