import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log("🧹 Cleaning existing data...");
  await prisma.billing.deleteMany();
  await prisma.project.deleteMany();
  await prisma.organizationContact.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  // Create Users
  console.log("👤 Creating users...");
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      emailVerified: new Date(),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      emailVerified: new Date(),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      emailVerified: new Date(),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
  });

  // Create Organizations
  console.log("🏢 Creating organizations...");
  const org1 = await prisma.organization.create({
    data: {
      name: "Acme Corporation",
      description: "A leading technology company specializing in software solutions",
      address: "123 Tech Street, San Francisco, CA 94105",
      email: "contact@acme.com",
      phone: "+1 (555) 123-4567",
      userId: user1.id,
      contacts: {
        create: [
          {
            firstName: "Alice",
            lastName: "Williams",
            position: "Project Manager",
            email: "alice.williams@acme.com",
            phone: "+1 (555) 123-4568",
          },
          {
            firstName: "Charlie",
            lastName: "Brown",
            position: "CTO",
            email: "charlie.brown@acme.com",
            phone: "+1 (555) 123-4569",
          },
        ],
      },
    },
  });

  const org2 = await prisma.organization.create({
    data: {
      name: "Global Solutions Inc",
      description: "International consulting firm",
      address: "456 Business Ave, New York, NY 10001",
      email: "info@globalsolutions.com",
      phone: "+1 (555) 234-5678",
      userId: user2.id,
      contacts: {
        create: [
          {
            firstName: "David",
            lastName: "Miller",
            position: "Director of Operations",
            email: "david.miller@globalsolutions.com",
            phone: "+1 (555) 234-5679",
          },
        ],
      },
    },
  });

  const org3 = await prisma.organization.create({
    data: {
      name: "Startup Ventures",
      description: "Early-stage startup accelerator",
      address: "789 Innovation Blvd, Austin, TX 78701",
      email: "hello@startupventures.com",
      phone: "+1 (555) 345-6789",
      userId: user1.id,
      contacts: {
        create: [
          {
            firstName: "Emma",
            lastName: "Davis",
            position: "Founder",
            email: "emma.davis@startupventures.com",
          },
        ],
      },
    },
  });

  // Create Projects
  console.log("📁 Creating projects...");
  const project1 = await prisma.project.create({
    data: {
      name: "Website Redesign",
      description: "Complete redesign of the company website with modern UI/UX",
      rate: 150.0,
      organizationId: org1.id,
      userId: user1.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: "Mobile App Development",
      description: "iOS and Android mobile application development",
      rate: 175.0,
      organizationId: org1.id,
      userId: user1.id,
    },
  });

  const project3 = await prisma.project.create({
    data: {
      name: "API Integration",
      description: "Third-party API integration and backend services",
      rate: 125.0,
      organizationId: org2.id,
      userId: user2.id,
    },
  });

  const project4 = await prisma.project.create({
    data: {
      name: "Cloud Migration",
      description: "Migrating infrastructure to AWS cloud",
      rate: 200.0,
      organizationId: org2.id,
      userId: user2.id,
    },
  });

  const project5 = await prisma.project.create({
    data: {
      name: "MVP Development",
      description: "Minimum viable product development",
      rate: 100.0,
      organizationId: org3.id,
      userId: user1.id,
    },
  });

  // Create Billing entries (time tracking)
  console.log("⏱️  Creating billing entries...");

  // Helper function to create date
  const createDate = (year: number, month: number, day: number, hour: number, minute: number) => {
    return new Date(year, month - 1, day, hour, minute);
  };

  // Billing entries for Project 1 (Website Redesign)
  await prisma.billing.createMany({
    data: [
      {
        userId: user1.id,
        projectId: project1.id,
        startDateTime: createDate(2024, 12, 1, 9, 0),
        endDateTime: createDate(2024, 12, 1, 12, 30),
      },
      {
        userId: user1.id,
        projectId: project1.id,
        startDateTime: createDate(2024, 12, 1, 13, 30),
        endDateTime: createDate(2024, 12, 1, 17, 0),
      },
      {
        userId: user1.id,
        projectId: project1.id,
        startDateTime: createDate(2024, 12, 2, 9, 0),
        endDateTime: createDate(2024, 12, 2, 11, 45),
      },
      {
        userId: user1.id,
        projectId: project1.id,
        startDateTime: createDate(2024, 12, 3, 10, 0),
        endDateTime: createDate(2024, 12, 3, 16, 0),
      },
    ],
  });

  // Billing entries for Project 2 (Mobile App)
  await prisma.billing.createMany({
    data: [
      {
        userId: user1.id,
        projectId: project2.id,
        startDateTime: createDate(2024, 12, 4, 9, 0),
        endDateTime: createDate(2024, 12, 4, 13, 0),
      },
      {
        userId: user1.id,
        projectId: project2.id,
        startDateTime: createDate(2024, 12, 5, 9, 0),
        endDateTime: createDate(2024, 12, 5, 17, 0),
      },
      {
        userId: user1.id,
        projectId: project2.id,
        startDateTime: createDate(2024, 12, 6, 10, 30),
        endDateTime: createDate(2024, 12, 6, 15, 30),
      },
    ],
  });

  // Billing entries for Project 3 (API Integration)
  await prisma.billing.createMany({
    data: [
      {
        userId: user2.id,
        projectId: project3.id,
        startDateTime: createDate(2024, 12, 2, 9, 0),
        endDateTime: createDate(2024, 12, 2, 17, 0),
      },
      {
        userId: user2.id,
        projectId: project3.id,
        startDateTime: createDate(2024, 12, 3, 9, 0),
        endDateTime: createDate(2024, 12, 3, 14, 0),
      },
      {
        userId: user2.id,
        projectId: project3.id,
        startDateTime: createDate(2024, 12, 4, 9, 0),
        endDateTime: createDate(2024, 12, 4, 12, 0),
      },
    ],
  });

  // Billing entries for Project 4 (Cloud Migration)
  await prisma.billing.createMany({
    data: [
      {
        userId: user2.id,
        projectId: project4.id,
        startDateTime: createDate(2024, 12, 5, 9, 0),
        endDateTime: createDate(2024, 12, 5, 17, 0),
      },
      {
        userId: user2.id,
        projectId: project4.id,
        startDateTime: createDate(2024, 12, 6, 9, 0),
        endDateTime: createDate(2024, 12, 6, 13, 0),
      },
    ],
  });

  // Billing entries for Project 5 (MVP Development)
  await prisma.billing.createMany({
    data: [
      {
        userId: user1.id,
        projectId: project5.id,
        startDateTime: createDate(2024, 12, 7, 9, 0),
        endDateTime: createDate(2024, 12, 7, 17, 0),
      },
      {
        userId: user1.id,
        projectId: project5.id,
        startDateTime: createDate(2024, 12, 8, 9, 0),
        endDateTime: createDate(2024, 12, 8, 15, 30),
      },
      {
        userId: user3.id,
        projectId: project5.id,
        startDateTime: createDate(2024, 12, 8, 10, 0),
        endDateTime: createDate(2024, 12, 8, 16, 0),
      },
    ],
  });

  // Create some sample Posts (from the original schema)
  console.log("📝 Creating sample posts...");
  await prisma.post.createMany({
    data: [
      { name: "Getting Started with Time Tracking" },
      { name: "Best Practices for Project Management" },
      { name: "Client Communication Tips" },
    ],
  });

  console.log("✅ Seed completed successfully!");
  console.log(`
📊 Summary:
  - Users: 3
  - Organizations: 3
  - Contacts: 4
  - Projects: 5
  - Billing entries: 15
  - Posts: 3
  `);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });

