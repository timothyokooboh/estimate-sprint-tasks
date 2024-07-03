#!/bin/bash

# SprintPoker API is hosted on a free server instance on render.com.
# One limitation is that free server instances spin down after 15 minutes of inactivity.
# This script prevents that by exceuting an operation that creates a test session and then deletes it.
# The script is then run via a cron job on GitHub Actions that execeutes every 10 minutes.

# Define the endpoint URL
URL="https://estimate-sprint-tasks.onrender.com"

# Define the GraphQL mutation for creating a session
CREATE_SESSION_MUTATION='
mutation createSession($input: CreateSessionInput!) {
  createSession(input: $input) {
    id
    title
    participants {
      id
      isModerator
    }
  }
}'

# Define the payload for creating a session
CREATE_SESSION_PAYLOAD='{"input": {"title": "test session", "moderator": "test user", "estimationMode": "TIME_ESTIMATES"}}'

# Combine the mutation and the payload into a JSON body
CREATE_SESSION_BODY=$(jq -n --arg query "$CREATE_SESSION_MUTATION" --argjson variables "$CREATE_SESSION_PAYLOAD" '{query: $query, variables: $variables}')

# Make the request to create a session
RESPONSE=$(curl -s -X POST $URL \
  -H "Content-Type: application/json" \
  -d "$CREATE_SESSION_BODY")

# Extract the session ID from the response
SESSION_ID=$(echo $RESPONSE | jq -r '.data.createSession.id')

# Check if the session ID was successfully extracted
if [ -z "$SESSION_ID" ]; then
  echo "Failed to create session or extract session ID"
  exit 1
fi

echo "Session created with ID: $SESSION_ID"

# Wait for 2 minutes (120 seconds)
sleep 120

# Define the GraphQL mutation for ending a session
END_SESSION_MUTATION='
mutation endSession($id: ID!) {
  endSession(id: $id)
}'

# Combine the mutation and the payload into a JSON body
END_SESSION_BODY=$(jq -n --arg query "$END_SESSION_MUTATION" --argjson variables "{\"id\": \"$SESSION_ID\"}" '{query: $query, variables: $variables}')

# Make the request to end the session
END_SESSION_RESPONSE=$(curl -s -X POST $URL \
  -H "Content-Type: application/json" \
  -d "$END_SESSION_BODY")

echo "End session response: $END_SESSION_RESPONSE"
