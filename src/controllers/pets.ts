import { Get, Query, Route, Tags } from "tsoa";
import { db } from "../database/prisma";
import { Pet } from "@prisma/client";
import { PaginationData } from "../types/common";

interface GetPetsArgs extends PaginationData {}

export default class PetsController {
  public async get({ skip = 0, take = 10 }: GetPetsArgs): Promise<Pet[]> {
    const data = await db.pet.findMany({
      skip,
      take,
    });

    return data;
  }
}
