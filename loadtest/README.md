# Load Testing

## Prerequisite
The tool `wrk` should be downloaded in advance.

Reference link: [wrk](https://github.com/wg/wrk)

## How to test
Run `bash loadtest_script.sh $connection $thread`
- connection: the base number of HTTP connections
- thread: the base number of thread to use

The log result will be saved in the `test_logs` folder.

### Example
`bash loadtest_script.sh 200 4` 
- This command will test on the combinations of connection 200, 300, 400 and thread 4, 6, 8
    - the gap for connection is 100 (200/2)
    - the gap for thread is 2 (4/2)

### Reminder
- The testing interval is fixed to 30 seconds.