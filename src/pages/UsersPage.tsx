import React, { useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
};

const mockUsers: UserRow[] = Array.from({ length: 48 }).map((_, i) => ({
  id: `u-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "Admin" : "Customer",
  status: i % 2 ? "active" : "inactive",
}));

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    return mockUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Users</h2>
          <p className="text-sm text-gray-600">Manage registered users</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            aria-label="Search users"
            className="px-3 py-2 rounded-md border"
            placeholder="Search by name or email"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <Card>
        <Table>
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="py-3 px-3">Name</th>
              <th className="py-3 px-3">Email</th>
              <th className="py-3 px-3">Role</th>
              <th className="py-3 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="py-3 px-3">{u.name}</td>
                <td className="py-3 px-3">{u.email}</td>
                <td className="py-3 px-3">{u.role}</td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      u.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * pageSize + 1} -{" "}
            {Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 rounded border"
            >
              Prev
            </button>
            <div className="px-3 py-1 rounded bg-gray-100">{page}</div>
            <button
              disabled={page >= pages}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              className="px-3 py-1 rounded border"
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
