
function Navbar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <h2>SiteOps</h2>

      <p className="sidebar-label">MAIN MENU</p>

      <button
        className={
          page === "dashboard" ? "nav-link active" : "nav-link"
        }
        onClick={() => setPage("dashboard")}
      >
        Dashboard
      </button>

      <button
        className={
          page === "sites" ? "nav-link active" : "nav-link"
        }
        onClick={() => setPage("sites")}
      >
        Sites
      </button>
    </aside>
  );
}

export default Navbar;
