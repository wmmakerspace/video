package main

import (
    "os"
    "log"
    "net/http"

    "github.com/wmmakerspace/data-stream-server"
)

func main() {
    port := os.Getenv("PORT")

    streamserver.Start("/video", []byte{0x6a, 0x73, 0x6d, 0x70, 0x01, 0x40, 0x00, 0xf0})

    log.Println("Server listening on port :" + port)
    log.Println("--------------------------------")
    log.Fatal(http.ListenAndServe(":"  + port, nil))
}
