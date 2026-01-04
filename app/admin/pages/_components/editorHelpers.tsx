export const Card = ({ title, children }: any) => (
  <div
    style={{
      background: "#fff",
      padding: 24,
      marginBottom: 24,
      borderRadius: 12,
      border: "1px solid #e5e7eb",
    }}
  >
    <h2 style={{ marginBottom: 16 }}>{title}</h2>
    {children}
  </div>
);

export const Input = ({ label, value, set }: any) => (
  <div style={{ marginBottom: 12 }}>
    <label>{label}</label>
    <input
      value={value}
      onChange={(e) => set(e.target.value)}
      style={{ width: "100%", padding: 10 }}
    />
  </div>
);

export const Textarea = ({ label, value, set }: any) => (
  <div style={{ marginBottom: 12 }}>
    <label>{label}</label>
    <textarea
      value={value}
      onChange={(e) => set(e.target.value)}
      style={{ width: "100%", padding: 10 }}
    />
  </div>
);

