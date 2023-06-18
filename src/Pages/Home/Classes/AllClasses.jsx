import { useEffect, useState } from "react";
import SingleCard from "../SingleCard/SingleCard";
import { Helmet } from "react-helmet-async";

const AllClasses = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://language-clube.vercel.app/activeAllClass")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="bg-white">
       <Helmet>
       <title>LanguageClub | All Classes</title>
       </Helmet>
      <h1 className="text-center text-3xl  lg:pt-24 text-green-700">
        All Classes{" "}
      </h1>
      <div className="grid lg:grid-cols-3 w-11/12 py-5  mx-auto gap-6">
        {data?.map((card) => (
          <SingleCard key={card._id} data={card}></SingleCard>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
