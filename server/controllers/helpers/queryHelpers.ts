import mongoose, { Query, Aggregate } from "mongoose";

type SortOrder = 1 | -1;

interface SortAndPopulateQuery<T> {
  sort: (arg: { [key: string]: SortOrder }) => SortAndPopulateQuery<T>;
  populate: (field: string, select?: string) => SortAndPopulateQuery<T>;
  exec: () => Promise<T>;
}

export const sortAndPopulate = <T>(
  query: SortAndPopulateQuery<T>,
  sortField: string = 'createdAt',
  sortOrder: number = -1,
  populateField: string = 'user',
  selectFields: string = 'firstName lastName',
) => {
  const sortObj = { [sortField]: sortOrder } as { [key: string]: SortOrder };
  return query.sort(sortObj).populate(populateField, selectFields).exec();
};

export const aggregateSort = (
  pipeline: Aggregate<any[]>,
  sortField: string = 'createdAt',
  sortOrder: SortOrder = -1,
): Aggregate<any[]> => {
  const sortStage = { $sort: { [sortField]: sortOrder } };
  return pipeline.append(sortStage);
};