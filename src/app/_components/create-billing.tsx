"use client";

import { useState } from "react";

import { api } from "~/trpc/react";
import styles from "../index.module.css";

export function CreateBilling() {
  const utils = api.useUtils();
  const { data: users } = api.user.getAll.useQuery();
  const { data: projects } = api.project.getAll.useQuery();

  const [userId, setUserId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const createBilling = api.billing.create.useMutation({
    onSuccess: async () => {
      await utils.billing.invalidate();
      setUserId("");
      setProjectId("");
      setStartDateTime("");
      setEndDateTime("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !projectId || !startDateTime) return;

    createBilling.mutate({
      userId,
      projectId,
      startDateTime: new Date(startDateTime).toISOString(),
      endDateTime: endDateTime
        ? new Date(endDateTime).toISOString()
        : undefined,
    });
  };

  // Helper to get current datetime in local timezone for input
  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className={styles.showcaseContainer}>
      <h2 className={styles.cardTitle}>Add Time Entry</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className={styles.input}
          required
        >
          <option value="">Select User *</option>
          {users?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name || user.email || user.id}
            </option>
          ))}
        </select>

        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className={styles.input}
          required
        >
          <option value="">Select Project *</option>
          {projects?.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name} - {project.organization.name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          placeholder="Start Date & Time *"
          value={startDateTime}
          onChange={(e) => setStartDateTime(e.target.value)}
          className={styles.input}
          required
        />

        <input
          type="datetime-local"
          placeholder="End Date & Time (optional)"
          value={endDateTime}
          onChange={(e) => setEndDateTime(e.target.value)}
          className={styles.input}
        />

        <button
          type="submit"
          className={styles.submitButton}
          disabled={
            createBilling.isPending || !userId || !projectId || !startDateTime
          }
        >
          {createBilling.isPending ? "Creating..." : "Create Time Entry"}
        </button>
      </form>
    </div>
  );
}

