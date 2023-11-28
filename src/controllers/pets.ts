import { db } from "../database/prisma";
import { Pet } from "@prisma/client";
import { PaginationData } from "../types/common";
import { supabase } from "../utils/supabase";

interface GetPetsArgs extends PaginationData {}

export default class PetsController {
  public async get({ skip = 0, take = 10 }: GetPetsArgs): Promise<Pet[]> {
    const pets = await db.pet.findMany({
      skip,
      take,
    });

    const petUids = pets.map(({ id }) => id);

    const petImages = await Promise.all(
      petUids.map((petUid) =>
        supabase.storage.from("pets").list(petUid, {
          limit: 20,
          offset: 0,
        })
      )
    ).then((res) => {
      const publicImages = res.map(
        ({ data }, idx) =>
          data
            ?.filter(({ name }) => name !== ".emptyFolderPlaceholder")
            .map(
              (img) =>
                supabase.storage
                  .from("pets")
                  .getPublicUrl(`${petUids[idx]}/${img.name}`).data.publicUrl
            ) ?? []
      );
      return publicImages;
    });

    const petImagesDictionary = Object.fromEntries(
      petUids.map((petUid, index) => [petUid, petImages[index]])
    );

    return pets.map((pet) => ({
      ...pet,
      images: petImagesDictionary[pet.id] ?? [],
    }));
  }
}
