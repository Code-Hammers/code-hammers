import { DocumentQuery } from "mongoose";

export const sortAndPopulate = (
  query: DocumentQuery<any, any, any>,
  sortField: string = "createdAt",
  sortOrder: number = -1,
  populateField: string = "user",
  selectFields: string = "firstName lastName"
) => {
  return query
    .sort({ [sortField]: sortOrder })
    .populate(populateField, selectFields)
    .exec();
};
