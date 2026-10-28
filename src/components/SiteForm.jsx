
import { useEffect, useState } from "react";

function SiteForm({ onAdd, editingSite, onUpdate, onCancel }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (editingSite) {
      setName(editingSite.name);
      setLocation(editingSite.location);
      setStatus(editingSite.status);
    } else {
      setName("");
      setLocation("");
      setStatus("Active");
    }
  }, [editingSite]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !location.trim()) {
      alert("Please enter the site name and location.");
      return;
    }

    const siteData = {
      name: name.trim(),
      location: location.trim(),
      status,
    };

    if (editingSite) {
      onUpdate({ ...siteData, id: editingSite.id });
    } else {
      onAdd(siteData);
    }
  }

  return (
    <form className="site-form" onSubmit={handleSubmit}>
      <h2>{editingSite ? "Edit Site" : "Add New Site"}</h2>

      <label>Site Name</label>
      <input
        type="text"
        placeholder="Enter site name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <label>Location</label>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        required
      />

      <label>Status</label>
      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
      </select>

      <button type="submit" className="primary-button">
        {editingSite ? "Update Site" : "Save Site"}
      </button>

      {editingSite && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default SiteForm;
