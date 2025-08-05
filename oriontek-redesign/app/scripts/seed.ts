
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Create HR admin users
    console.log('Creating admin users...');
    
    const anilUser = await prisma.user.upsert({
      where: { email: 'ANIL@oriontekinc.com' },
      update: {},
      create: {
        email: 'ANIL@oriontekinc.com',
        name: 'Anil Kumar',
        role: 'admin',
        password: await bcrypt.hash('defaultPassword123', 12),
        isActive: true
      }
    });

    const subhaUser = await prisma.user.upsert({
      where: { email: 'subha@oriontekinc.com' },
      update: {},
      create: {
        email: 'subha@oriontekinc.com',
        name: 'Subha Sharma',
        role: 'admin',
        password: await bcrypt.hash('defaultPassword123', 12),
        isActive: true
      }
    });

    // Create test user account as mentioned in requirements
    const testUser = await prisma.user.upsert({
      where: { email: 'john@doe.com' },
      update: {},
      create: {
        email: 'john@doe.com',
        name: 'John Doe',
        role: 'admin',
        password: await bcrypt.hash('johndoe123', 12),
        isActive: true
      }
    });

    console.log('Admin users created successfully');

    // Create sample employees
    console.log('Creating sample employees...');

    const employees = [
      {
        employeeId: 'EMP001',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@oriontekinc.com',
        phone: '+1-234-567-8901',
        department: 'Engineering',
        position: 'Senior Software Engineer',
        startDate: new Date('2020-01-15'),
        status: 'Active',
        salary: 95000,
        address: '123 Main St',
        city: 'Atlanta',
        state: 'GA',
        country: 'USA',
        zipCode: '30309',
        emergencyContact: 'Jane Smith',
        emergencyPhone: '+1-234-567-8902'
      },
      {
        employeeId: 'EMP002',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@oriontekinc.com',
        phone: '+1-234-567-8903',
        department: 'Human Resources',
        position: 'HR Manager',
        startDate: new Date('2019-03-20'),
        status: 'Active',
        salary: 75000,
        address: '456 Oak Ave',
        city: 'Suwanee',
        state: 'GA',
        country: 'USA',
        zipCode: '30024',
        emergencyContact: 'Mike Johnson',
        emergencyPhone: '+1-234-567-8904'
      },
      {
        employeeId: 'EMP003',
        firstName: 'Raj',
        lastName: 'Patel',
        email: 'raj.patel@oriontekinc.com',
        phone: '+91-866-351-0304',
        department: 'Engineering',
        position: 'Tech Lead',
        startDate: new Date('2018-06-10'),
        status: 'Active',
        salary: 85000,
        address: 'Ramachandra Nagar',
        city: 'Vijayawada',
        state: 'Andhra Pradesh',
        country: 'India',
        zipCode: '520008',
        emergencyContact: 'Priya Patel',
        emergencyPhone: '+91-866-351-0305'
      },
      {
        employeeId: 'EMP004',
        firstName: 'Emily',
        lastName: 'Chen',
        email: 'emily.chen@oriontekinc.com',
        phone: '+1-647-555-0123',
        department: 'Quality Assurance',
        position: 'QA Engineer',
        startDate: new Date('2021-02-01'),
        status: 'Active',
        salary: 70000,
        address: '789 Maple Dr',
        city: 'Milton',
        state: 'ON',
        country: 'Canada',
        zipCode: 'L9T 5L6',
        emergencyContact: 'David Chen',
        emergencyPhone: '+1-647-555-0124'
      },
      {
        employeeId: 'EMP005',
        firstName: 'Michael',
        lastName: 'Davis',
        email: 'michael.davis@oriontekinc.com',
        phone: '+1-234-567-8905',
        department: 'Project Management',
        position: 'Project Manager',
        startDate: new Date('2017-09-15'),
        status: 'Active',
        salary: 90000,
        address: '321 Pine St',
        city: 'Atlanta',
        state: 'GA',
        country: 'USA',
        zipCode: '30309',
        emergencyContact: 'Lisa Davis',
        emergencyPhone: '+1-234-567-8906'
      }
    ];

    for (const empData of employees) {
      await prisma.employee.upsert({
        where: { employeeId: empData.employeeId },
        update: {},
        create: empData
      });
    }

    console.log('Sample employees created successfully');

    // Create sample timesheets
    console.log('Creating sample timesheets...');

    const allEmployees = await prisma.employee.findMany();
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    for (const employee of allEmployees) {
      for (let i = 0; i < 5; i++) {
        const date = new Date(oneWeekAgo.getTime() + i * 24 * 60 * 60 * 1000);
        await prisma.timesheet.create({
          data: {
            employeeId: employee.id,
            date: date,
            hoursWorked: 8,
            description: `Daily development work - Day ${i + 1}`,
            project: 'Oriontek Website Redesign',
            taskType: 'Development',
            status: i < 3 ? 'Approved' : 'Pending',
            approvedBy: i < 3 ? 'Manager' : null,
            approvedAt: i < 3 ? new Date() : null
          }
        });
      }
    }

    console.log('Sample timesheets created successfully');

    // Create sample notifications
    console.log('Creating sample notifications...');

    const notifications = [
      {
        title: 'Welcome to HR Portal',
        message: 'The new HR portal system is now live. Please explore the features and let us know your feedback.',
        type: 'Info'
      },
      {
        title: 'Timesheet Reminder',
        message: 'Please submit your timesheets for this week by Friday 5:00 PM.',
        type: 'Warning'
      },
      {
        title: 'System Maintenance',
        message: 'Scheduled maintenance will occur this Sunday from 2:00 AM to 4:00 AM EST.',
        type: 'Info'
      },
      {
        title: 'New Employee Onboarding',
        message: 'New employees joining next week. Please ensure all onboarding documents are ready.',
        type: 'Success'
      }
    ];

    for (const notification of notifications) {
      await prisma.notification.create({
        data: notification
      });
    }

    console.log('Sample notifications created successfully');

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  });
