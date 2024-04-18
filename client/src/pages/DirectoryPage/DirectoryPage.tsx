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

  useEffect(() => {
    const getAlumniData = async () => {
      try {
        const response = await axios.get("/api/alumni");
        console.log(response);
      } catch (error) {
        console.log("Something just caught fire in Directory useEffect");
      }
    };

    getAlumniData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
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
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full max-w-3xl">
          <div className="grid grid-cols-3 text-center mb-2">
            <div>
              <strong>Name</strong>
            </div>
            <div>
              <strong>Company</strong>
            </div>
            <div>
              <strong>Email</strong>
            </div>
          </div>
          {alumni.map((alum) => (
            <div key={alum._id} className="grid grid-cols-3 text-center py-2">
              <div>{alum.name}</div>
              <div>{alum.company}</div>
              <div>{alum.email}</div>
            </div>
          ))}
        </div>
      )}
      {/* TODO Pagination controls! */}
    </div>
  );
};

export default DirectoryPage;
