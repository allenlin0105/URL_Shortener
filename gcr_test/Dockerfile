FROM alpine:latest

COPY main.cpp /
RUN apk update && \
    apk add --no-cache g++ && \
    g++ main.cpp && \
    apk del g++ && \
    apk add --no-cache libstdc++ && \
    rm -rf /var/cache main.cpp
   
CMD [ "./a.out" ]