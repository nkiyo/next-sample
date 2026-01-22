#!/bin/bash

curl -X POST http://localhost:3000/api/workflow/execute \
  -H "Content-Type: application/json" \
  -d '{ "num": 123 }'
