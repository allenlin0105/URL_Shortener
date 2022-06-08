local charset = {}

for i = 48,  57 do table.insert(charset, string.char(i)) end
for i = 65,  90 do table.insert(charset, string.char(i)) end
for i = 97, 122 do table.insert(charset, string.char(i)) end

function string.random(length)
  math.randomseed(os.time())

  if length > 0 then
    return string.random(length - 1) .. charset[math.random(1, #charset)]
  else
    return ""
  end
end

request = function()
    random_hash = string.random(8)
    return wrk.format("GET", "/api/getUrl/" .. random_hash)
end

--  wrk -t2 -c400 -d5s -s url_redirect_wrk_script.lua --latency http://34.80.193.44