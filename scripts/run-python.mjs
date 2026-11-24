import { spawnSync } from 'node:child_process'

const scriptArgs = process.argv.slice(2)

if (scriptArgs.length === 0) {
  console.error('Usage: node scripts/run-python.mjs <script.py>')
  process.exit(1)
}

const isWindows = process.platform === 'win32'
const command = isWindows ? 'py' : 'python3'
const args = isWindows
  ? ['-3', '-B', ...scriptArgs]
  : ['-B', ...scriptArgs]

const result = spawnSync(command, args, {
  stdio: 'inherit',
  windowsHide: true,
})

if (result.error) {
    console.error('Python launch failed: ' + result.error.message)
  process.exit(1)
}

process.exit(result.status ?? 1)
