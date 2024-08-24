import { useAppContext } from "../context/AppContext";

const CVPage = () => {
  const { cvData } = useAppContext();
  console.log(cvData);
  if (!cvData) {
    return (
      <h3 className="text-center mt-8 font-bold text-2xl ">
        Let's create a{" "}
        <a href="/admin" className="underline text-blue-500">
          CV
        </a>
      </h3>
    );
  }
  return (
    <div className="max-w-4xl mx-4 border md:mx-auto my-8 border-black bg-white shadow-lg rounded-lg">
      {/* Personal Information */}
      <div className="p-6 pb-2  bg-black text-white  mb-2">
        <h3 className="font-bold  text-center text-2xl">{cvData?.name}</h3>
        <div className="flex justify-between">
          <div className="">
            <p className="">{cvData?.email}</p>
            <p className="">{cvData?.phone}</p>
          </div>
          <div className="">
            {cvData.socialLinks.map((item, index) => {
              return (
                <div key={index}>
                  <a href={item} className="underline text-blue-500 ">
                    {item}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="p-6 pb-2  mb-2">
        <h2 className="text-2xl font-bold mb-2 border border-l-0 border-r-0 border-t-0 border-b-2 border-black">
          Education
        </h2>
        {cvData?.education.map((edu) => (
          <div key={edu.id} className="mb-2">
            <h3 className="text-xl font-semibold">{edu.institution}</h3>
            <p className="text-gray-500">
              {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ""}
            </p>
            <p className="text-gray-700">
              {edu.degree} {edu.percentage ? `- ${edu.percentage}%` : ""}
            </p>
          </div>
        ))}
      </div>

      {/* Experience Section */}
      <div className=" p-6 pb-2  mb-2">
        <h2 className="text-2xl font-bold mb-2 border border-l-0 border-r-0 border-t-0 border-b-2 border-black">
          Experience
        </h2>
        {cvData?.experience.map((exp) => (
          <div key={exp.id} className="mb-2">
            <h3 className="text-xl font-semibold">
              {exp.role} at {exp.company}
            </h3>
            <p className="text-gray-700">
              {exp.startDate} - {exp.endDate}
            </p>
            <p className="text-gray-500">{exp.skillsUsed}</p>
            <p className="text-gray-600">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Skills Section */}
      <div className="p-6 mb-4 pb-2">
        <h2 className="text-2xl font-bold mb-2 border border-l-0 border-r-0 border-t-0 border-b-2 border-black">
          Skills
        </h2>
        <ul className="list-disc list-inside">
          {cvData?.skills.map((skill, index) => (
            <li key={index} className="text-gray-700">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CVPage;
