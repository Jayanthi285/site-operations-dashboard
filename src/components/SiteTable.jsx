
function SiteTable({ sites, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Site ID</th>
            <th>Site Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sites.length > 0 ? (
            sites.map((site) => (
              <tr key={site.id}>
                <td>{site.id}</td>
                <td>{site.name}</td>
                <td>{site.location}</td>
                <td>
                  <span
                    className={`status ${site.status.toLowerCase()}`}
                  >
                    {site.status}
                  </span>
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => onEdit(site)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => onDelete(site.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No sites found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SiteTable;
