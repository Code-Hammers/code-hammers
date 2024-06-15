import mongoose, { Query, Aggregate } from "mongoose";

type SortOrder = 1 | -1;

// ? Should the sortOrder here be number or SortOrder type?
export const sortAndPopulate = (
  query: Query<any, any, any>,
  sortField: string = "createdAt",
  sortOrder: number = -1,
  populateField: string = "user",
  selectFields: string = "firstName lastName"
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