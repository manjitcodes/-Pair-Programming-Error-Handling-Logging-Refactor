# API Audit Notes

## 1. Existing Error Handling

The original API handled errors directly inside individual route handlers.

Examples:

- GET `/notes/:id` returned status 404 when a note was not found.
- POST `/notes` returned status 400 when the text field was missing.
- PUT `/notes/:id` returned status 404 when a note was not found.
- DELETE `/notes/:id` returned status 404 when a note was not found.

The errors were handled separately in multiple routes instead of using centralized error handling.

## 2. Error Response Consistency

The original API used the following format:

```json
{
  "message": "Note not found"
}