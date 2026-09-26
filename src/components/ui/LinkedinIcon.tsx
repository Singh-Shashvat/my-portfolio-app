import { CiLinkedin } from "react-icons/ci";

export const LinkedinIcon = () => {
  return (
    <div>
      <a
        aria-label="LinkedIn"
        className="text-white hover:text-blue-400 transition"
        href="https://www.linkedin.com/in/shashvat-singh-258a032b5/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <CiLinkedin />
      </a>
    </div>
  );
};
