// create-migration.js
const { execSync } = require('child_process');

const migrationName = process.argv[2];
const migrationPath = './migrations/';

if (!migrationName) {
 console.error('Please provide a migration name.');
 process.exit(1);
}

const command = `typeorm migration:create ${migrationPath}${migrationName} `;
execSync(command, { stdio: 'inherit' });
