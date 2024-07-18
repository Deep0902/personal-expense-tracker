import "./Footer.css";
function Footer() {
  return (
    <>
      <div className="footer">
        <div className="textBlock">
          <div className="textSection">
            <label className="poppins-semibold">About</label>
            <br />
            <span className="poppins-regular">
              Personal expense tracking tool designed to help you manage your
              finances effortlessly
            </span>
          </div>
          <div className="textSection">
            <label className="poppins-semibold">Quick Links</label>
            <br />
            <span className="poppins-regular">
              <ul>
                <li>Email: deeptank09@gmail.com</li>
                <li>LinkedIn</li>
                <li>GitHub</li>
              </ul>
            </span>
          </div>
          <div className="textSection">
            <label className="poppins-semibold">Project Info</label>
            <br />
            <span className="poppins-regular">
              This project is made using React.js, Flask, MongoDB and deployed
              on Github <br />
              <br />
              It is a personal project and not for commercial use
            </span>
          </div>
        </div>
        <br />
        <hr />
        <p>© 2024 Personal Expense Tracker. All rights reserved.</p>
      </div>
    </>
  );
}
export default Footer;
