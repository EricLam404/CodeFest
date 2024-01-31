//Quiz template in json so we dont waste the api for testing

export const TestQuizData = {
    "completion": {
        "id": "chatcmpl-8l6SQ67j5zDKOEngbYIDQUE4QpS6u",
        "object": "chat.completion",
        "created": 1706236930,
        "model": "gpt-3.5-turbo-1106",
        "choices": [
            {
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": "{\n    \"title\": \"Sets and Notation Quiz\",\n    \"questions\": [\n      {\n        \"question\": \"What is a set?\",\n        \"choices\": [\n          \"An ordered collection of distinct objects\",\n          \"An unordered collection of distinct objects\",\n          \"A collection of objects with repetitions\",\n          \"A collection of mathematical symbols\"\n        ],\n        \"answer\": \"An unordered collection of distinct objects\"\n      },\n      {\n        \"question\": \"How is membership in a set denoted?\",\n        \"choices\": [\n          \"Using the symbol ∈\",\n          \"Using the ellipsis notation\",\n          \"By listing the elements in increasing order\",\n          \"By specifying a long sequence\"\n        ],\n        \"answer\": \"Using the symbol ∈\"\n      },\n      {\n        \"question\": \"What does the notation {1, 2, . . . , n} represent?\",\n        \"choices\": [\n          \"An infinite set\",\n          \"A set with a pattern\",\n          \"All integers between 1 and n\",\n          \"All powers of two up to n\"\n        ],\n        \"answer\": \"A set with a pattern\"\n      },\n      {\n        \"question\": \"How is the set of natural numbers or nonnegative integers denoted?\",\n        \"choices\": [\n          \"N\",\n          \"N+\",\n          \"N-\",\n          \"Z\"\n        ],\n        \"answer\": \"N\"\n      },\n      {\n        \"question\": \"Which set contains all the reals that are not rational?\",\n        \"choices\": [\n          \"N\",\n          \"Z\",\n          \"Q\",\n          \"R\"\n        ],\n        \"answer\": \"R\"\n      }\n    ]\n  }"
                },
                "logprobs": null,
                "finish_reason": "stop"
            }
        ],
        "usage": {
            "prompt_tokens": 1342,
            "completion_tokens": 348,
            "total_tokens": 1690
        },
        "system_fingerprint": "fp_b57c83dd65"
    }
}