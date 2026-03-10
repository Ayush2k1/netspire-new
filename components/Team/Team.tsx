import TeamCard from "../Cards/TeamCard";
var pluralize = require("pluralize");

const Team = ({ team }: { team: any[] }) => {
  const getUniquePositions = (team: any[]) => {
    const positions = team.map((member) => member.position);
    return [...new Set(positions)];
  };

  return (
    <section className="section-padding">
      <div className="max-w-container mx-auto flex flex-col gap-20">
        {getUniquePositions(team).map((position, index) => (
          <div key={index} className=" items-center grid grid-cols-10 ">
            <div className="h-full 1300:flex text-center items-start col-span-10 1300:col-span-2">
              <p className="text-2xl 1300:text-left font-semibold 1300:sticky top-[200px] mb-5 1300:mb-0">
                {pluralize(position)}
              </p>
            </div>

            <div className="flex justify-center col-span-10 1300:col-span-8">
              <div className="grid 1200:grid-cols-2 gap-3 w-full">
                {team
                  .filter((member) => member.position === position)
                  .map((filteredMember, idx) => (
                    <TeamCard
                      key={idx}
                      data={
                        filteredMember as any & {
                          position: string;
                          gradient: {
                            colorPicker1: { hex: string };
                            colorPicker2: { hex: string };
                            colorPicker3: { hex: string };
                            colorPicker4: { hex: string };
                          };
                        }
                      }
                      index={idx}
                      sticky={false}
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
