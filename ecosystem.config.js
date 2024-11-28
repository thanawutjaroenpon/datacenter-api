module.exports = {
  apps: [{
    name: "upos-api",
    script: "./dist/main.js",
    // instances: 2,
    // max_memory_restart: "300M",

    // Logging
    // out_file: "./out.log",
    // error_file: "./error.log",
    // merge_logs: true,
    log_date_format: "DD-MM HH:mm:ss Z",
    // log_type: "json",
    time: true
  }]
}
