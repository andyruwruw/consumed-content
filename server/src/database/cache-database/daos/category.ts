export class Category {

  constructor(
    userId: number,
    name: string,
  ) {

  }

  static create({
    userId,
    name,
  }): Category {
    return new Category(
      userId,
      name,
    );
  }
}