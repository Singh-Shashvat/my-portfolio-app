import { IoLogoGithub } from "react-icons/io";

const GithubIcon = () => {
  return (
    <div>
      <a
        aria-label="GitHub "
        className="text-white hover:text-blue-400 transition"
        href="https://github.com/Singh-Shashvat"
        rel="noopener noreferrer"
        target="_blank"
      >
        <IoLogoGithub />
      </a>
    </div>
  );
};

export default GithubIcon;
