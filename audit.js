const { execSync } = require('child_process');
const fs = require('fs');

console.log('--- STARTING AUDIT ---');

const runGrep = (pattern, path) => {
  try {
    return execSync(git grep -i "" ).toString().trim().split('\n').filter(Boolean);
  } catch (e) {
    return [];
  }
};

const todos = runGrep('TODO:', '.');
console.log(Found  TODO comments.);

const fixmes = runGrep('FIXME:', '.');
console.log(Found  FIXME comments.);

const mocks = runGrep('dummyData\\|mockData\\|placeholder', 'apps/');
console.log(Found  potential mock/placeholder data in frontend apps.);

const hardcodedToasts = runGrep('toast.info(.Scheduled for Phase', 'apps/');
console.log(Found  features explicitly locked for Phase 2/3.);

// Check for empty API clients
const emptyAPIs = runGrep('return Promise.resolve', 'apps/');
console.log(Found  stubbed API calls (returning Promise.resolve).);

fs.writeFileSync('audit_results.json', JSON.stringify({
  todos: todos.length,
  fixmes: fixmes.length,
  mocks: mocks.length,
  hardcodedToasts: hardcodedToasts.length,
  emptyAPIs: emptyAPIs.length
}, null, 2));

console.log('--- AUDIT COMPLETE ---');
