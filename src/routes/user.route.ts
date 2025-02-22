import express from "express";
import { all_users, create_user, delete_user, get_user_by_id, search_user, update_user } from "../controllers/user.controller";
import { create_user_validation } from './../validators/user/create_user.validation';
import { valid_id } from "../validators/valid_id.validation";
import { valid_search_validation } from "../validators/user/valid_search_validation";
import { update_user_validation } from "../validators/user/update_user.validation";

export const user_route = express.Router();

// get all users (GET) link/api/users/
user_route.get("/", all_users);

// get user by id (GET) link/api/users/:id
user_route.get("/:id", valid_id(), get_user_by_id);

// create user (POST) link/api/users/
user_route.post("/", create_user_validation(), create_user);

// search user (POST) link/api/users/search/
user_route.post("/search/", valid_search_validation(), search_user);

// delete user (DELETE) link/api/users/:id
user_route.delete("/:id", valid_id(), delete_user);

// update user (patch) link/api/users/:id
user_route.patch("/:id", valid_id(), update_user_validation(), update_user);
