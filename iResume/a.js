var exec = require('child_process').exec;

// 成功的例子
exec("top -cbn 1 | awk -F '[ %]+' 'NR==3 {print $3}'", function (error, stdout, stderr) {
  if (error) {
    console.error('error: ' + error);
    return;
  }
  console.log('stdout: ' + stdout);
  console.log('stderr: ' +  stderr);
});