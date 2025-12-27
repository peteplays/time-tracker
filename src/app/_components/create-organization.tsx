"use client";

import { useState } from "react";

import { api } from "~/trpc/react";
import styles from "../index.module.css";

export function CreateOrganization() {
  const utils = api.useUtils();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Contact fields
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactPosition, setContactPosition] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [includeContact, setIncludeContact] = useState(false);

  const createOrganization = api.organization.create.useMutation({
    onSuccess: async () => {
      await utils.organization.invalidate();
      // Reset form
      setName("");
      setDescription("");
      setAddress("");
      setEmail("");
      setPhone("");
      setContactFirstName("");
      setContactLastName("");
      setContactPosition("");
      setContactPhone("");
      setContactEmail("");
      setIncludeContact(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createOrganization.mutate({
      name,
      description: description || undefined,
      address: address || undefined,
      email: email || undefined,
      phone: phone || undefined,
      contact: includeContact
        ? {
            firstName: contactFirstName,
            lastName: contactLastName,
            position: contactPosition || undefined,
            phone: contactPhone || undefined,
            email: contactEmail || undefined,
          }
        : undefined,
    });
  };

  return (
    <div className={styles.showcaseContainer}>
      <h2 className={styles.cardTitle}>Add Organization</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Organization Name *"
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
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={styles.input}
        />

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
          <input
            type="checkbox"
            checked={includeContact}
            onChange={(e) => setIncludeContact(e.target.checked)}
          />
          <span>Add a contact</span>
        </label>

        {includeContact && (
          <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "4px" }}>
            <h3 style={{ margin: "0 0 1rem 0", fontSize: "1rem" }}>Contact Information</h3>
            <input
              type="text"
              placeholder="First Name *"
              value={contactFirstName}
              onChange={(e) => setContactFirstName(e.target.value)}
              className={styles.input}
              required={includeContact}
            />
            <input
              type="text"
              placeholder="Last Name *"
              value={contactLastName}
              onChange={(e) => setContactLastName(e.target.value)}
              className={styles.input}
              required={includeContact}
            />
            <input
              type="text"
              placeholder="Position"
              value={contactPosition}
              onChange={(e) => setContactPosition(e.target.value)}
              className={styles.input}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className={styles.input}
            />
          </div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={createOrganization.isPending || !name}
        >
          {createOrganization.isPending ? "Creating..." : "Create Organization"}
        </button>
      </form>
    </div>
  );
}

