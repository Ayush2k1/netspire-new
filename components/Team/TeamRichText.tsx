import React from "react";
import TeamCard from "../Cards/TeamCard";

const TeamRichText = ({ data, index }: { data: any[]; index: number }) => {
  return (
    data?.length > 0 && (
      <div
        key={index}
        className="grid 950:grid-cols-2 1250:grid-cols-1 1450:grid-cols-2 gap-3 my-10 800:my-14"
      >
        {data.map((member, key) => (
          <div key={key}>
            {
              <TeamCard
                data={
                  member as any & {
                    shortBio: string;
                    position: string;
                    gradient: {
                      colorPicker1: { hex: string };
                      colorPicker2: { hex: string };
                      colorPicker3: { hex: string };
                      colorPicker4: { hex: string };
                    };
                  }
                }
                index={key}
                sticky={false}
              />
            }
          </div>
        ))}
      </div>
    )
  );
};

export default TeamRichText;
