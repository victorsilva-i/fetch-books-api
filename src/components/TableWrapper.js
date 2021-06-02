export function TableWrapper({ children }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
      }}
    >
      <div style={{ height: 400, width: "90%" }}>{children}</div>
    </div>
  );
}
