module.exports = {
  apps: [{
    name: 'React Seed',
    cwd: `${__dirname}`,
    script: './server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    merge_logs: true,
    error: '/dev/null',
    output: '/dev/null',
    env: {
      NODE_ENV: 'development',
      PORT: '3030',
    },
    env_production: {
      NODE_ENV: 'production',
      CONFIG_ENV: 'production',
      PORT: '8080',
    },
  }],
}
