import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAlumni } from "../../features/alumni/alumniSlice";

const DirectoryPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { alumni, status, page, totalPages } = useAppSelector(
    (state) => state.alumni
  );
  const [nameSearch, setNameSearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");

  useEffect(() => {
    dispatch(fetchAlumni({ page, name: nameSearch, company: companySearch }));
  }, [dispatch, page, nameSearch, companySearch]);

  const handlePreviousPage = () => {
    if (page > 1) {
      dispatch(
        fetchAlumni({
          page: page - 1,
          name: nameSearch,
          company: companySearch,
        })
      );
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      dispatch(
        fetchAlumni({
          page: page + 1,
          name: nameSearch,
          company: companySearch,
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start pt-20 p-4">
      <div className="sticky mt-20 z-10 bg-gray-900 w-full text-center py-4">
        <h1 className="text-4xl font-extrabold mb-4">Alumni Directory</h1>
        <div className="flex justify-center space-x-4 mb-4">
          <input
            type="text"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            placeholder="Search by name"
            className="mb-4 p-2 text-gray-900"
          />
          <input
            type="text"
            value={companySearch}
            onChange={(e) => setCompanySearch(e.target.value)}
            placeholder="Search by company"
            className="mb-4 p-2 text-gray-900"
          />
        </div>
      </div>
      <div className="w-full max-w-3xl">
        <div className="grid grid-cols-3 text-center mb-2">
          <strong>Name</strong>
          <strong>Company</strong>
          <strong>Email</strong>
        </div>
        <div className="overflow-auto" style={{ maxHeight: "60vh" }}>
          {status === "loading" ? (
            <p>Loading...</p>
          ) : (
            alumni.map((alum) => (
              <div key={alum._id} className="grid grid-cols-3 text-center py-2">
                <div>{alum.name}</div>
                <div>{alum.company}</div>
                <div>{alum.email}</div>
              </div>
            ))
          )}
        </div>
        <div className="py-4 flex justify-between">
          <button onClick={handlePreviousPage} disabled={page <= 1}>
            Previous
          </button>
          <button onClick={handleNextPage} disabled={page >= totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectoryPage;
