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


# Stage 2
### Database Choice
I would use MySQL because it is reliable, easy to maintain, and supports indexing for faster searches.

### Database Schema
Student Table
- student_id(Primary Key)
- name
- email

Notification Table
- notification_id(Primary Key)
- student_id(Foreign Key)
- notification_type
- message
- is_read
- created_at

### Possible Problems as Data Increases
Slow search performance when notifications become very large.
Increased database storage.
Longer response times while fetching notifications.

### Solutions
Create indexes on student_id and notification_type.
Use pagination while fetching notifications.
Archive old notifications if required.
Optimize frequently used queries.

### SQL Queries
Get all notifications of a student:
SELECT * FROM notifications
WHERE student_id=1042;

Get unread notifications:
SELECT * FROM notifications
WHERE student_id=1042
AND is_read=false;

Mark notification as read:
UPDATE notifications
SET is_read=true
WHERE notification_id=1;

Get placement notifications:
SELECT * FROM notifications
WHERE notification_type='Placement';

Get unread notification count:
SELECT COUNT(*)
FROM notifications
WHERE student_id=1042
AND is_read=false;