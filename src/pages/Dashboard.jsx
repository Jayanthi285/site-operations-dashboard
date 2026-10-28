
import SummaryCard from "../components/SummaryCard";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>
            Monitor your sites and installation activities.
          </p>
        </div>
      </div>

      <div className="summary-container">
        <SummaryCard
          title="Total Sites"
          value={25}
          description="All registered sites"
        />

        <SummaryCard
          title="Total Installations"
          value={80}
          description="Across all sites"
        />

        <SummaryCard
          title="Completed"
          value={55}
          description="Installations completed"
        />

        <SummaryCard
          title="Pending"
          value={25}
          description="Awaiting completion"
        />
      </div>

      <div className="welcome-panel">
        <h2>Welcome to SiteOps!</h2>
        <p>
          Manage your sites and track installation progress
          from one place.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
