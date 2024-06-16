type SortOrder = 1 | -1;

interface SortAndPopulateQuery<T> {
  sort: (arg: { [key: string]: SortOrder }) => SortAndPopulateQuery<T>;
  populate: (field: string, select?: string) => SortAndPopulateQuery<T>;
  exec: () => Promise<T>;
}
interface AggregateQuery<T> {
  sort: (arg: { [key: string]: SortOrder }) => AggregateQuery<T>;
  project: (field: { [key: string]: 0 | 1 }) => AggregateQuery<T>;
  lookup: (lookupOptions: {
    from: string,
    localField: string,
    foreignField: string,
    as: string
  }) => AggregateQuery<T>;
  exec: () => Promise<T[]>;
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

export const aggregateSort = <T>(
  pipeline: AggregateQuery<T>,
  sortField: string = 'createdAt',
  sortOrder: SortOrder = -1,
) => {
  const sortObj: Record<string, SortOrder> = { [sortField]: sortOrder };
  return pipeline.sort(sortObj).exec();
};