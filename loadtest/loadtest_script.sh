base_connection=$1
base_thread=$2

# Create a folder to save logs if not exists
logs_folder_name="test_logs"
if [ ! -d $logs_folder_name ]; then
    mkdir $logs_folder_name
fi

# Run test
gap_connection=$(($base_connection / 2))
gap_thread=$(($base_thread / 2))
max_connection=$(($base_connection + $gap_connection * 2))
max_thread=$(($base_thread + $gap_thread * 2))

for ((connection=$base_connection; connection<=$max_connection; connection+=$gap_connection)); do
    for ((thread=$base_thread; thread<=$max_thread; thread+=$gap_thread)); do
        echo "Testing connection=$connection, thread=$thread"
        wrk -t$thread -c$connection -d30s http://34.81.49.12:80 > ${logs_folder_name}/log_connection_${connection}_thread_${thread}.txt
        echo "Finish testing"
    done
done