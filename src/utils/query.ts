import { Request } from "express";
import { PaginationData } from "../types/common";

export const getPaginationData = (req: Request): PaginationData => {
  const pagination = {
    skip: req.query.skip ? Number(req.query.skip) : undefined,
    take: req.query.take ? Number(req.query.take) : undefined,
  };
  return pagination;
};
