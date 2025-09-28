import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import 'dotenv/config';
import * as schema from './schema';
// In a real app, you'd use a library like bcrypt to generate this hash.
// For this project, we're using a consistent mock hash for the password 'password123'.
const MOCK_PASSWORD_HASH = 'mock_hash_for_password123';
async function runSeed() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required for seeding');
  }
  console.log('Connecting to database for seeding...');
  const client = postgres(process.env.DATABASE_URL);
  const db = drizzle(client, { schema });
  console.log('Seeding database...');
  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await db.delete(schema.parentLinks);
    await db.delete(schema.schoolMembers);
    await db.delete(schema.schools);
    await db.delete(schema.users);
    // Create Owner
    console.log('Creating owner...');
    const [owner] = await db.insert(schema.users).values({
      email: 'owner@aetheris.io',
      firstName: 'Atlas',
      lastName: 'Prime',
      role: 'owner',
      hashedPassword: MOCK_PASSWORD_HASH,
    }).returning();
    // Create School
    console.log('Creating school...');
    const [school] = await db.insert(schema.schools).values({
      name: 'Aetheris Academy',
      ownerId: owner.id,
    }).returning();
    // Create School Admin
    console.log('Creating school admin...');
    const [admin] = await db.insert(schema.users).values({
      email: 'admin@aetheris.academy',
      firstName: 'Orion',
      lastName: 'Stark',
      role: 'school_admin',
      hashedPassword: MOCK_PASSWORD_HASH,
    }).returning();
    await db.insert(schema.schoolMembers).values({
      userId: admin.id,
      schoolId: school.id,
      role: 'school_admin',
    });
    // Create Teacher
    console.log('Creating teacher...');
    const [teacher] = await db.insert(schema.users).values({
      email: 'teacher@aetheris.academy',
      firstName: 'Lyra',
      lastName: 'Vega',
      role: 'teacher',
      hashedPassword: MOCK_PASSWORD_HASH,
    }).returning();
    await db.insert(schema.schoolMembers).values({
      userId: teacher.id,
      schoolId: school.id,
      role: 'teacher',
    });
    // Create Student & Parent
    console.log('Creating student and parent...');
    const [student] = await db.insert(schema.users).values({
      email: 'student@aetheris.academy',
      firstName: 'Leo',
      lastName: 'Minor',
      role: 'student',
      hashedPassword: MOCK_PASSWORD_HASH,
    }).returning();
    await db.insert(schema.schoolMembers).values({
      userId: student.id,
      schoolId: school.id,
      role: 'student',
    });
    const [parent] = await db.insert(schema.users).values({
      email: 'parent@aetheris.io',
      firstName: 'Cassiopeia',
      lastName: 'Minor',
      role: 'parent',
      hashedPassword: MOCK_PASSWORD_HASH,
    }).returning();
    // Link parent and student
    console.log('Linking parent and student...');
    await db.insert(schema.parentLinks).values({
      parentId: parent.id,
      studentId: student.id,
    });
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('Database connection closed.');
  }
}
runSeed();