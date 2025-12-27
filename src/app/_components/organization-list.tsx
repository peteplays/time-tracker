"use client";

import { api } from "~/trpc/react";
import styles from "../index.module.css";

export function OrganizationList() {
  const { data: organizations, isLoading } = api.organization.getAll.useQuery();

  if (isLoading) {
    return <p className={styles.showcaseText}>Loading organizations...</p>;
  }

  if (!organizations || organizations.length === 0) {
    return <p className={styles.showcaseText}>No organizations found.</p>;
  }

  return (
    <div className={styles.showcaseContainer}>
      <h2 className={styles.cardTitle}>Organizations</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {organizations.map((org) => (
          <li
            key={org.id}
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem 0" }}>{org.name}</h3>
            {org.description && (
              <p style={{ margin: "0 0 0.5rem 0", color: "#666" }}>
                {org.description}
              </p>
            )}
            <div style={{ fontSize: "0.875rem", color: "#888" }}>
              {org.email && <div>Email: {org.email}</div>}
              {org.phone && <div>Phone: {org.phone}</div>}
              <div>Contacts: {org.contacts.length}</div>
              <div>Projects: {org.projects.length}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
