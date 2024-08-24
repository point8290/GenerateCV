import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa"; // Import FontAwesome icons
import { FormData, useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const CVForm: React.FC = () => {
  const navigate = useNavigate();
  const { setCvData, cvData } = useAppContext();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    socialLinks: [],
    education: [],
    experience: [],
    skills: [],
  });
  const [errors, setErrors] = useState({
    percentage: "",
    phone: "",
  });
  const validateFields = (name: string, value: string) => {
    let errorMessage = "";

    if (name === "percentage") {
      const percentageValue = parseFloat(value);
      if (
        isNaN(percentageValue) ||
        percentageValue < 0 ||
        percentageValue > 100
      ) {
        errorMessage = "Percentage must be a number between 0 and 100";
      }
    }

    if (name === "phone") {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value)) {
        errorMessage = "Phone number must be a 10-digit number";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    return errorMessage === "";
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      validateFields(name, value);
    }
    setFormData({ ...formData, [name]: value });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          id: Date.now(),
          institution: "",
          degree: "",
          percentage: "",
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          id: Date.now(),
          company: "",
          role: "",
          skillsUsed: "",
          description: "",
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ""],
    });
  };

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, ""],
    });
  };

  const removeEducation = (id: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((edu) => edu.id !== id),
    });
  };

  const removeExperience = (id: number) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((exp) => exp.id !== id),
    });
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    });
  };

  const removeSocialLink = (index: number) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    formData.education.forEach((edu) => {
      if (!validateFields("percentage", edu.percentage)) {
        valid = false;
      }
    });

    if (!validateFields("phone", formData.phone)) {
      valid = false;
    }

    if (valid) {
      localStorage.setItem("cvData", JSON.stringify(formData));
      setCvData(formData);
      navigate("/");
    }
  };
  useEffect(() => {
    if (cvData) {
      setFormData({ ...cvData });
    }
  }, [cvData]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-4">
      <h2 className="text-3xl font-bold mb-4 text-center">CV Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <h3 className="text-xl font-bold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder=" "
              value={formData.name}
              onChange={handleInputChange}
              className="border p-2 mb-2 w-full focus:outline-none focus:border-blue-500 focus:shadow"
            />
            <label className="absolute top-2 left-2 text-gray-600 pointer-events-none transition-all">
              Name
            </label>
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder=" "
              value={formData.email}
              onChange={handleInputChange}
              className="border p-2 mb-2 w-full focus:outline-none focus:border-blue-500 focus:shadow"
            />
            <label className="absolute top-2 left-2 text-gray-600 pointer-events-none transition-all">
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              placeholder=" "
              value={formData.phone}
              onChange={handleInputChange}
              className="border p-2 mb-2 w-full focus:outline-none focus:border-blue-500 focus:shadow"
            />
            <label className="absolute top-2 left-2 text-gray-600 pointer-events-none transition-all">
              Phone
            </label>
            {errors.phone && <div className="text-red-500">{errors.phone}</div>}
          </div>
        </div>
        {/* Social Media Links */}
        <h3 className="text-xl mb-4 font-bold mt-4 flex items-center">
          Social Media Links
          <button
            type="button"
            onClick={addSocialLink}
            className="ml-2 bg-blue-400 text-white rounded-full p-1"
          >
            <FaPlus size={10} />
          </button>
        </h3>
        {formData.socialLinks.map((link, index) => (
          <div key={index} className="relative">
            <div className=" mb-2">
              <input
                type="text"
                value={link}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: formData.socialLinks.map((sl, i) =>
                      i === index ? e.target.value : sl
                    ),
                  })
                }
                className="border p-2 mb-1 w-full focus:outline-none focus:border-blue-500 focus:shadow"
              />
            </div>
            <button
              type="button"
              onClick={() => removeSocialLink(index)}
              className="absolute top-[20%] right-[2px] bg-black text-white p-2 rounded-full"
            >
              <FaTrash size={10} />
            </button>
          </div>
        ))}

        {/* Education Section */}
        <h3 className="text-xl mb-4 font-bold mt-4 flex items-center">
          Education
          <button
            type="button"
            onClick={addEducation}
            className="ml-2 bg-blue-400 text-white rounded-full p-1"
          >
            <FaPlus size={10} />
          </button>
        </h3>
        {formData.education.map((edu) => (
          <div
            key={edu.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 relative mb-4 p-4 pr-10 border rounded-lg shadow-sm"
          >
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                value={edu.institution}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: formData.education.map((ed) =>
                      ed.id === edu.id
                        ? { ...ed, institution: e.target.value }
                        : ed
                    ),
                  })
                }
                className="border p-2 mb-1 w-full focus:outline-none focus:border-blue-500 focus:shadow"
              />
              <label className="absolute top-2 left-2 text-gray-600 pointer-events-none transition-all">
                Institution
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                value={edu.degree}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: formData.education.map((ed) =>
                      ed.id === edu.id ? { ...ed, degree: e.target.value } : ed
                    ),
                  })
                }
                className="border p-2 mb-1 w-full focus:outline-none focus:border-blue-500 focus:shadow"
              />
              <label className="absolute top-2 left-2 text-gray-600 pointer-events-none transition-all">
                Degree
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                name="percentage"
                value={edu.percentage}
                onChange={(e) => {
                  validateFields(e.target.name, e.target.value);
                  setFormData({
                    ...formData,
                    education: formData.education.map((ed) =>
                      ed.id === edu.id
                        ? { ...ed, percentage: e.target.value }
                        : ed
                    ),
                  });
                }}
                className="border p-2 mb-1 w-full focus:outline-none focus:border-blue-500 focus:shadow"
              />
              <label className="absolute top-2 left-2 text-gray-600 pointer-events-none transition-all">
                Percentage
              </label>
              {errors.percentage && (
                <div className="text-red-500">{errors.percentage}</div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                placeholder="Start Date"
                value={edu.startDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: formData.education.map((ed) =>
                      ed.id === edu.id
                        ? { ...ed, startDate: e.target.value }
                        : ed
                    ),
                  })
                }
                className="border p-2 mb-1 w-full focus:outline-none focus:border-blue-500 focus:shadow"
              />
              <input
                type="date"
                placeholder="End Date"
                value={edu.endDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: formData.education.map((ed) =>
                      ed.id === edu.id ? { ...ed, endDate: e.target.value } : ed
                    ),
                  })
                }
                className="border p-2 mb-1 w-full focus:outline-none focus:border-blue-500 focus:shadow"
              />
            </div>
            <button
              type="button"
              onClick={() => removeEducation(edu.id)}
              className="absolute top-[10px] right-[3px] bg-black text-white p-2 rounded-full"
            >
              <FaTrash size={10} />
            </button>
          </div>
        ))}

        {/* Experience Section */}
        <h3 className="text-xl mb-4 font-bold mt-4 flex items-center">
          Experience
          <button
            type="button"
            onClick={addExperience}
            className="ml-2 bg-blue-400 text-white rounded-full p-1"
          >
            <FaPlus size={10} />
          </button>
        </h3>
        {formData.experience.map((exp) => (
          <div
            key={exp.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 relative mb-4 p-4 pr-10 border rounded-lg shadow-sm"
          >
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                value={exp.company}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: formData.experience.map((ex) =>
                      ex.id === exp.id ? { ...ex, company: e.target.value } : ex
                    ),
                  })
                }
                className="border p-2 mb-1 w-full focus:outline-none focus:border-blue-500 focus:shadow"
              />
              <label className="absolute top-2 left-2 text-gray-600 pointer-events-none transition-all">
                Company
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                value={exp.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: formData.experience.map((ex) =>
                      ex.id === exp.id ? { ...ex, role: e.target.value } : ex
                    ),
                  })
                }
                className="border p-2 mb-1 w-full focus:outline-none focus:border-blue-500 focus:shadow"
              />
              <label className="absolute top-2 left-2 text-gray-600 pointer-events-none transition-all">
                Role
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                value={exp.skillsUsed}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: formData.experience.map((ex) =>
                      ex.id === exp.id
                        ? { ...ex, skillsUsed: e.target.value }
                        : ex
                    ),
                  })
                }
                className="border p-2 mb-1 w-full focus:outline-none focus:border-blue-500 focus:shadow"
              />
              <label className="absolute top-2 left-2 text-gray-600 pointer-events-none transition-all">
                Skills Used
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: formData.experience.map((ex) =>
                      ex.id === exp.id
                        ? { ...ex, startDate: e.target.value }
                        : ex
                    ),
                  })
                }
                className="border p-2 mb-1 w-full focus:outline-none focus:border-blue-500 focus:shadow"
              />
              <input
                type="date"
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: formData.experience.map((ex) =>
                      ex.id === exp.id ? { ...ex, endDate: e.target.value } : ex
                    ),
                  })
                }
                className="border p-2 mb-1 w-full focus:outline-none focus:border-blue-500 focus:shadow"
              />
            </div>
            <div className="relative">
              <textarea
                placeholder=" "
                value={exp.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: formData.experience.map((ex) =>
                      ex.id === exp.id
                        ? { ...ex, description: e.target.value }
                        : ex
                    ),
                  })
                }
                className="border p-2 mb-1 w-full focus:outline-none focus:border-blue-500 focus:shadow"
              />
              <label className="absolute top-2 left-2 text-gray-600 pointer-events-none transition-all">
                Brief Description
              </label>
            </div>

            <button
              type="button"
              onClick={() => removeExperience(exp.id)}
              className="absolute top-[10px] right-[3px] bg-black text-white p-2 rounded-full"
            >
              <FaTrash size={10} />
            </button>
          </div>
        ))}

        {/* Skills Section */}
        <h3 className="text-xl mb-4 font-bold mt-4 flex items-center">
          Skills
          <button
            type="button"
            onClick={addSkill}
            className="ml-2 bg-blue-400 text-white rounded-full p-1"
          >
            <FaPlus size={10} />
          </button>
        </h3>
        {formData.skills.map((skill, index) => (
          <div key={index} className="relative mb-2">
            <input
              type="text"
              value={skill}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skills: formData.skills.map((sk, i) =>
                    i === index ? e.target.value : sk
                  ),
                })
              }
              className="border p-2 mb-1 w-full focus:outline-none focus:border-blue-500 focus:shadow"
            />
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="absolute top-[20%] right-[2px] bg-black text-white p-2 rounded-full"
            >
              <FaTrash size={10} />
            </button>
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CVForm;
