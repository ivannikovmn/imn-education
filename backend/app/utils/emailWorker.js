require('dotenv').config();

const { Worker } = require('bullmq');
const nodemailer = require('nodemailer');

const connection = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT || 6379),
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const worker = new Worker(
  'imn-education-email',
  async (job) => {
    const { to, subject, text } = job.data;

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      text,
    });

    console.log(`Email sent for job ${job.id}: ${info.response}`);
    return { messageId: info.messageId };
  },
  { connection }
);

worker.on('failed', (job, error) => {
  console.error(`Email job ${job?.id} failed:`, error.message);
});

worker.on('error', (error) => {
  console.error('Email worker error:', error.message);
});

console.log('IMN Education email worker started');

async function shutdown() {
  await worker.close();
  await transporter.close();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
