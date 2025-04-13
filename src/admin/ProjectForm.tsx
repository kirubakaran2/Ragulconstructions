import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import projectService from "./services/projects";

interface Project {
  _id?: string;
  title: string;
  description: string;
  location: string;
  year: string;
  ytlink:string;
  instalink:string;
  feedback:string;
  images: string[];
  type: string;
}

interface ProjectFormProps {
  project: Project | null;
  onClose: () => void;
  onSave: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [ytlink, setytlink] = useState<string>("");
  const [instalink, setinstalink] = useState<string>("");
  const [feedback, setfeedback] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setLocation(project.location);
      setYear(project.year);
      setType(project.type);
      setytlink(project.ytlink);
      setfeedback(project.feedback);
      setinstalink(project.instalink);
      setPreviewImages(project.images || []);
    }
  }, [project]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index: number) => {
    const newPreview = [...previewImages];
    newPreview.splice(index, 1);
    setPreviewImages(newPreview);

    if (index < previewImages.length - images.length) {
      // Removing an existing image (not from the new uploads)
      // You might want to track which existing images to delete
    } else {
      // Removing a newly uploaded image
      const newImages = [...images];
      newImages.splice(index - (previewImages.length - images.length), 1);
      setImages(newImages);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("year", year);
      formData.append("type", type);
      formData.append("ytlink",ytlink);
      formData.append("instalink",instalink);
      formData.append("feedback",feedback);
      images.forEach((image) => {
        formData.append("images", image);
      });

      if (project) {
        await projectService.update(project._id!, formData); // Safe to use `project._id!` if `project` exists
      } else {
        await projectService.create(formData);
      }

      onSave();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {project ? "Edit Project" : "Add New Project"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Year
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ytlink
                  </label>
                  <input
                    type="text"
                    value={ytlink}
                    onChange={(e) => setytlink(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    instalink
                  </label>
                  <input
                    type="text"
                    value={instalink}
                    onChange={(e) => setinstalink(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    feedback
                  </label>
                  <input
                    type="text"
                    value={feedback}
                    onChange={(e) => setfeedback(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Project Type
                  </label>
                  <select
                    value={type} // You can change the state variable name if you prefer (e.g., setProjectType)
                    onChange={(e) => setType(e.target.value)} // Make sure the state variable matches
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select a project type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Project">Project</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Design">Design</option>
                    <option value="Interior">Interior</option>
                    <option value="Project Management">
                      Project Management
                    </option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Images
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  accept="image/*"
                />

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {previewImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Preview ${index}`}
                        className="h-24 w-full object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
