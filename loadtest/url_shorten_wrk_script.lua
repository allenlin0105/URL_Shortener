local urllist = {}
for line in io.lines("urldata.csv") do
    local url, label = line:match("%s*(.-),%s*(.-)")
    if(label == "bad") then goto continue end
    urllist[#urllist + 1] = url
    ::continue::
end

request = function()
    headers = {}
    headers["Content-Type"] = "application/json"
    body = '{"expiry": ' .. math.floor(math.random(60, 1209600)/60)*60 .. ', "url": ' .. urllist[math.random(#urllist)] .. '}'
    return wrk.format("POST", "/api/urlgen", headers, body)
end

--  wrk -t2 -c400 -d360s -s url_shorten_wrk_script.lua --latency http://34.80.193.44