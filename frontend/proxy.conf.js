const PROXY_CONFIG = [
    {
        context: [
            "/helloworld.Greeter"
        ],
        target: "http://localhost:50051",
        secure: false
    }
]

module.exports = PROXY_CONFIG;