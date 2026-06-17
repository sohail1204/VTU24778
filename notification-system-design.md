# Stage 1-API Design 
## Get Notifications
GET /notifications
Response:
{
  "notifications":[]
}

## Get Unread Notifications Count
GET /notifications/unread-count
Response:
{
  "count":5
}

## Mark Notification as Read
PATCH /notifications/{id}/read
Response:
{
  "message":"Notification marked as read"
}

## Mark All Notifications as Read
PATCH /notifications/read-all
Response:
{
  "message":"All notifications marked as read"
}

## Filter Notifications
GET /notifications?type=Placement
Response:
{
  "notifications":[]
}

## Notification Schema
{
  "id":"uuid",
  "type":"Placement",
  "message":"Amazon hiring drive",
  "timestamp":"2026-04-22T17:51:30Z",
  "isRead":false
}

## Real Time Updates
WebSocket can be used to send new notifications instantly to the user without refreshing the page.
