const { spawn } = require("node:child_process");
const path = require("node:path");

const workspace = __dirname;
const node = process.execPath;
const next = path.join(workspace, "node_modules", "next", "dist", "bin", "next");

const child = spawn(node, [next, "dev", "-H", "127.0.0.1", "-p", "3000"], {
  cwd: workspace,
  detached: true,
  stdio: "ignore",
  windowsHide: true
});

child.unref();
console.log(`Cortex OS dev server started on http://127.0.0.1:3000 with pid ${child.pid}`);
