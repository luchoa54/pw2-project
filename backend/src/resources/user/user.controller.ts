// src/resources/user/user.controller.ts

import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import * as userService from "./user.service";
import { UpdateUserDto } from "./user.types";
import { UserTypes } from "./userType/userType.constants";

const userController = {
  listUsers: async (req: Request, res: Response) => {
    if (!req.session.userType) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: ReasonPhrases.UNAUTHORIZED });
    }
    if (req.session.userType !== UserTypes.admin) {
      return res.status(StatusCodes.FORBIDDEN).json({ msg: ReasonPhrases.FORBIDDEN });
    }

    try {
      const users = await userService.findAll();
      res.status(StatusCodes.OK).json(users);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  getUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "ID do usuário é obrigatório" });
    }
    if (!req.session.userId || !req.session.userType) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: ReasonPhrases.UNAUTHORIZED });
    }
    const sessionUserId = req.session.userId;
    const sessionUserType = req.session.userType;
    if (sessionUserType !== UserTypes.admin && sessionUserId !== id) {
      return res.status(StatusCodes.FORBIDDEN).json({ msg: ReasonPhrases.FORBIDDEN });
    }

    try {
      // Agora o TS sabe que 'id' é string
      const user = await userService.findById(id); 
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Usuário não encontrado" });
      }
      res.status(StatusCodes.OK).json(user);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  updateUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body as UpdateUserDto;

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "ID do usuário é obrigatório" });
    }

    if (!req.session.userId || !req.session.userType) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: ReasonPhrases.UNAUTHORIZED });
    }
    const sessionUserId = req.session.userId;
    const sessionUserType = req.session.userType;

    if (sessionUserType !== UserTypes.admin && sessionUserId !== id) {
      return res.status(StatusCodes.FORBIDDEN).json({ msg: ReasonPhrases.FORBIDDEN });
    }
    if (sessionUserType === UserTypes.client && data.userTypeId === UserTypes.admin) {
        return res.status(StatusCodes.FORBIDDEN).json({ msg: "Você não pode se promover a administrador." });
    }

    try {
      const updatedUser = await userService.update(id, data);
      res.status(StatusCodes.OK).json(updatedUser);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "ID do usuário é obrigatório" });
    }

    if (!req.session.userId || !req.session.userType) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: ReasonPhrases.UNAUTHORIZED });
    }
    const sessionUserId = req.session.userId;
    const sessionUserType = req.session.userType;

    if (sessionUserType !== UserTypes.admin && sessionUserId !== id) {
      return res.status(StatusCodes.FORBIDDEN).json({ msg: ReasonPhrases.FORBIDDEN });
    }

    try {
      const deletedUser = await userService.remove(id);
      res.status(StatusCodes.OK).json(deletedUser);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

export default userController;