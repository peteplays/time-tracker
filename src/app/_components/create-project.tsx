"use client";

import { useState } from "react";

import { api } from "~/trpc/react";
import styles from "../index.module.css";

export function CreateProject() {
  const utils = api.useUtils();
  const { data: organizations } = api.organization.getAll.useQuery();

  const [organizationId, setOrganizationId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");

  const createProject = api.project.create.useMutation({
    onSuccess: async () => {
      await utils.project.invalidate();
      await utils.organization.invalidate();
      setName("");
      setDescription("");
      setRate("");
      setOrganizationId("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationId) return;

    createProject.mutate({
      organizationId,
      name,
      description: description || undefined,
      rate: rate || undefined,
    });
  };

  return (
    <div className={styles.showcaseContainer}>
      <h2 className={styles.cardTitle}>Add Project</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <select
          value={organizationId}
          onChange={(e) => setOrganizationId(e.target.value)}
          className={styles.input}
          required
        >
          <option value="">Select Organization *</option>
          {organizations?.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Project Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Hourly Rate (e.g., 150.00)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className={styles.input}
        />

        <button
          type="submit"
          className={styles.submitButton}
          disabled={createProject.isPending || !name || !organizationId}
        >
          {createProject.isPending ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}

