import React from "react";
import CareerCard from "../Cards/CareerCard";

const Careers = ({ careers }: { careers: any[] }) => {
  return (
    <section className="section-padding">
      <div className="max-w-container mx-auto">
        {careers?.length >= 1 ? (
          <div className="grid 1100:grid-cols-2 gap-8">
            {careers.map((career, key) => (
              <CareerCard key={key} data={career} index={key} />
            ))}
          </div>
        ) : (
          <div>No Openings at the Moment!</div>
        )}
      </div>
    </section>
  );
};

export default Careers;
