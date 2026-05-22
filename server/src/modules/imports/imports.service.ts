export function parseLeadCsv(csv: string) {
  const lines = csv.trim().split("\n");
  const rows = lines.slice(1);
  const errors = rows.flatMap((row, index) => {
    const [firstName, lastName] = row.split(",");
    void firstName;
    return lastName ? [] : [{ row: index + 2, message: "lastName is required" }];
  });

  return { totalRows: rows.length, errors };
}
