package main

import (
    "log"
    "net/http"

    "github.com/wmmakerspace/data-stream-server"
)

var port = ":8080"

func main() {
    streamserver.Start("/video")

    log.Println("Server listening on port " + port)
    log.Println("--------------------------------")
    log.Fatal(http.ListenAndServe(port, nil))
}
