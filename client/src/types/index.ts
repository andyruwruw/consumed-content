export interface IUser {
  id: number;
  name: string;
  password?: string;
  private: boolean;
  image: string;
  username: string;
}

export interface IShow {
  id: number;
  title: string;
  type: string;
  genre: string;
}

export interface IPlatform {
  id: number;
  name: string;
  cost: number;
}

export interface ICategory {
  id: number;
  userId: number;
  name: string;
}

// export interface IReview {

// }

// export interface ICategoryItem {

// }

// export interface IFollow {

// }
