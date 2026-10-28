
import { useState , useEffect } from "react";
import axios from "axios";
import SiteTable from "../components/SiteTable";
import SiteForm from "../components/SiteForm";

// const initialSites = [
//   { id: 1, name: "Chennai Central", location: "Chennai", status: "Active" },
//   { id: 2, name: "Madurai Branch", location: "Madurai", status: "Pending" },
//   { id: 3, name: "Pondicherry Site", location: "Puducherry", status: "Active" },
// ];

function Sites() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingSite, setEditingSite] = useState(null);

  useEffect(() => {
  async function fetchSites() {
    try {
      const response = await axios.get("http://localhost:5000/api/sites");
      setSites(response.data);
      setError("");
    } catch (err) {
      setError("Unable to load sites. Please check whether the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  fetchSites();
}, []);

  const filteredSites = sites.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(search.toLowerCase()) ||
      site.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || site.status === status;

    return matchesSearch && matchesStatus;
  });

  // function addSite(newSite) {
  //   setSites((currentSites) => {
  //     const nextId =
  //       currentSites.length > 0
  //         ? Math.max(...currentSites.map((site) => site.id)) + 1
  //         : 1;

  //     return [...currentSites, { ...newSite, id: nextId }];
  //   });

  //   setShowForm(false);
  // }

  
async function addSite(newSite) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/sites",
      newSite
    );

    setSites((currentSites) => [
      ...currentSites,
      response.data,
    ]);

    setShowForm(false);
  } catch (error) {
    console.error("Error adding site:", error);
    alert("Unable to add site. Please check the backend.");
  }
}


  // function editSite(updatedSite) {
  //   setSites((currentSites) =>
  //     currentSites.map((site) =>
  //       site.id === updatedSite.id ? updatedSite : site
  //     )
  //   );

  //   setEditingSite(null);
  //   setShowForm(false);
  // }

  
async function editSite(updatedSite) {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/sites/${updatedSite.id}`,
      updatedSite
    );

    setSites((currentSites) =>
      currentSites.map((site) =>
        site.id === updatedSite.id ? response.data : site
      )
    );

    setEditingSite(null);
    setShowForm(false);
  } catch (error) {
    console.error("Error updating site:", error);
    alert("Unable to update site. Please check the backend.");
  }
}


  // function deleteSite(id) {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete this site?"
  //   );

  //   if (confirmed) {
  //     setSites((currentSites) =>
  //       currentSites.filter((site) => site.id !== id)
  //     );

  //     if (editingSite?.id === id) {
  //       setEditingSite(null);
  //       setShowForm(false);
  //     }
  //   }
  // }

  
async function deleteSite(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this site?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    await axios.delete(`http://localhost:5000/api/sites/${id}`);

    setSites((currentSites) =>
      currentSites.filter((site) => site.id !== id)
    );
  } catch (error) {
    console.error("Error deleting site:", error);
    alert("Unable to delete site. Please check the backend.");
  }
}


  function handleEdit(site) {
    setEditingSite(site);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingSite(null);
    setShowForm(false);
  }

  function handleAddClick() {
    setEditingSite(null);
    setShowForm((current) => !current);
  }

  return (
    <div className="sites-page">
      <div className="page-header">
        <div>
          <h1>Sites Management</h1>
          <p>Search, filter, and manage your sites.</p>
        </div>

        <button className="primary-button" onClick={handleAddClick}>
          {showForm && !editingSite ? "Close Form" : "+ Add Site"}
        </button>
      </div>

      {showForm && (
        <SiteForm
          onAdd={addSite}
          editingSite={editingSite}
          onUpdate={editSite}
          onCancel={handleCancel}
        />
      )}

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by site or location..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {loading ? (
  <p>Loading sites...</p>
) : error ? (
  <p>{error}</p>
) : (
      <SiteTable
        sites={filteredSites}
        onEdit={handleEdit}
        onDelete={deleteSite}
      />
)}
    </div>
  );
}

export default Sites;
