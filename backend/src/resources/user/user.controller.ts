// src/resources/user/user.controller.ts

import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import * as userService from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./user.types";
import { UserTypes } from "./userType/userType.constants";

const userController = {
  createUser: async (req: Request, res: Response) => {
    const data = req.body as CreateUserDto;

    if (!data.name || !data.email || !data.password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Nome, e-mail e senha são obrigatórios." });
    }
    
    try {
      const newUser = await userService.create(data);
      res.status(StatusCodes.CREATED).json(newUser); 
    } catch (err) {
      const prismaError = err as any;
      
      if (prismaError.code === 'P2002' && prismaError.meta.target.includes('email')) {
         return res.status(StatusCodes.CONFLICT).json({ msg: "E-mail já cadastrado." });
      }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
  },

  listUsers: async (req: Request, res: Response) => {
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
    if (sessionUserType !== UserTypes.admin && data.userTypeId === UserTypes.admin) {
        return res.status(StatusCodes.FORBIDDEN).json({ msg: "Você não tem permissão para alterar o tipo de usuário." });
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

    if (sessionUserType !== UserTypes.admin) {
      return res.status(StatusCodes.FORBIDDEN).json({ msg: ReasonPhrases.FORBIDDEN });
    }
    
    if (sessionUserId === id) {
        return res.status(StatusCodes.FORBIDDEN).json({ msg: "Administrador não pode deletar a própria conta através desta rota." });
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