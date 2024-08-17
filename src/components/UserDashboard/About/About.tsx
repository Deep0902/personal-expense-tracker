import { useEffect } from "react";
import "./About.css";
function About() {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="aboutContainer">
        <h3 className="poppins-semibold">About</h3>
        <p className="poppins-regular">
          Welcome to the Personal Project Tracker! This tool is designed to help
          you manage your projects, track your expenses, and stay organized.
          Whether you're working on a personal project, managing household
          finances, or keeping track of freelance work, our tracker provides all
          the tools you need to stay on top of your tasks.
        </p>
        <br />
        <br />
        <h3 className="poppins-semibold">FAQ</h3>
        <p className="poppins-regular">Q: How can I reset my Password?</p>
        <p className="poppins-regular">
          A: Go to the login screen and click on Forgot Password. Follow the
          instructions to reset your password.
        </p>
        <br />
        <p className="poppins-regular">Q: Can I export my data?</p>
        <p className="poppins-regular">
          A: Yes, you can export your project data and reports in CSV format
          from the Transaction History section.
        </p>
        <br />
        <p className="poppins-regular">Q: How do I delete my account?</p>
        <p className="poppins-regular">
          A: Navigate to the Settings or Profile section and scroll down till
          you see a button saying Delete my account. Click on it and then the
          confirmation. Please note that this action cannot be undone.
        </p>
        <br />
        <h3>Project Info</h3>
        <p>
          The Personal Project Tracker was developed to help individuals and
          small teams efficiently manage their projects and finances. The goal
          is to provide a user-friendly platform that simplifies project
          management and expense tracking, enabling users to focus more on their
          work and less on administrative tasks. <br />
          <br />
          Click&nbsp;
          <a
            href="https://github.com/Deep0902/personal-expense-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="hyperlink"
          >
            here
          </a>{" "}
          to check out the project code on GitHub
        </p>
        <br />
        <br />
        <div className="bottomText">
          <p>Your data stays with you. We don't collect, so you don't fret.</p>
        </div>
        <br />
      </div>
    </>
  );
}

export default About;
