package main

import (
    "os"
    "log"
    "net/http"

    "github.com/wmmakerspace/data-stream-server"
)

func main() {
    port := os.Getenv("PORT")

    streamserver.Start("/video")

    log.Println("Server listening on port " + port)
    log.Println("--------------------------------")
    log.Fatal(http.ListenAndServe(":"  + port, nil))
}
