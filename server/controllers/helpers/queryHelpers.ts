import mongoose, { Query } from "mongoose";

type SortOrder = 1 | -1;

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
