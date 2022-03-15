import { IShowReviewObject } from '../../../shared/types';

export interface IShowReviewRequestResponse {
  reviews: IShowReviewObject[];
  averageRating: number;
  reviewCount: number;
}
