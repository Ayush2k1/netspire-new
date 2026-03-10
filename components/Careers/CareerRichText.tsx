import React from "react";
import CareerCard from "../Cards/CareerCard";

const CareerRichText = ({ data }: { data: { careers: any[] } }) => {
  return (
    data?.careers?.length > 0 && (
      <div className="grid 950:grid-cols-2 1250:grid-cols-1 1450:grid-cols-2 gap-3 my-10 800:my-14">
        {data.careers.map((career: any, key: number) => (
          <div key={key}>
            <CareerCard data={career} index={key} />
          </div>
        ))}
      </div>
    )
  );
};

export default CareerRichText;
