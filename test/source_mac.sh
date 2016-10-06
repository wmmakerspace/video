#!/usr/bin/env bash
ffmpeg \
    -f avfoundation \
    -s 320x240 \
    -r 30 \
    -i "0" \
    -f mpeg1video - | \
go run $GOPATH/src/github.com/wmmakerspace/data-stream-server/utils/source.go \
    -url=ws://localhost:8080/video/in \
    -metadata='{\"name\": \"test video stream\"}' \
    -video-magic-bytes
    #-url=ws://makerspace-video.herokuapp.com/video/in \
