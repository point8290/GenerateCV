import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { cvData } = useAppContext();
  return (
    <header className="bg-black p-4 py-2 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <a href="/" className="text-white hover:text-gray-200">
            GenerateCV
          </a>
        </div>

        <nav className="flex space-x-4">
          <a href="/" className="text-white hover:text-gray-200">
            Home
          </a>
          {cvData && (
            <a href="/admin" className="text-white hover:text-gray-200">
              Edit CV
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
