
function SummaryCard({ title, value, description }) {
  return (
    <div className="summary-card">
      <p className="card-title">{title}</p>

      <h2>{value}</h2>

      <p className="card-description">{description}</p>
    </div>
  );
}

export default SummaryCard;
