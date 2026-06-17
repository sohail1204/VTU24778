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

# Stage 3
### Is the Query Accurate?
Yes,the query correctly fetches unread notifications of student 1042.
SELECT * FROM notifications
WHERE student_id=1042
AND is_read=false
ORDER BY created_at ASC;

### Why is it Slow?
The notifications table contains millions of records.
No proper index may exist on student_id and is_read.
SELECT * fetches all columns even when not required.
Sorting requires additional processing.

### Improvements
Create a composite index:
CREATE INDEX idx_student_read_created
ON notifications(student_id, is_read,created_at);
Fetch only required columns:
SELECT notification_id, message, notification_type, created_at
FROM notifications
WHERE student_id=1042
AND is_read=false
ORDER BY created_at ASC;

### Should We Add Indexes on Every Column?
No.Adding indexes on every column increases storage usage and slows down INSERT, UPDATE, and DELETE operations.
Indexes should only be created on frequently searched columns.

### Query to Find Students Who Received Placement Notifications in the Last 7 Days
SELECT DISTINCT student_id
FROM notifications
WHERE notification_type='Placement'
AND created_at>=NOW()-INTERVAL 7 DAY;

### Likely Computation Cost
Without indexes:
Full table scan
Time Complexity: O(n)
With proper index:
Indexed search
Time Complexity: O(log n)

# Stage 4
### Problem
Notifications are fetched every time a page loads. This increases database load and slows down the application.

### Solutions
1. Use Caching
Frequently accessed notifications can be stored in Redis cache instead of querying the database every time.
Advantage:
- Faster response time
- Reduced database load
Tradeoff:
- Additional memory usage

2. Use Pagination
Fetch only a limited number of notifications at a time.
Example:GET /notifications?page=1&limit=10
Advantage:
- Less data transferred
- Faster queries
Tradeoff:
- Multiple API calls may be needed

3. Real-Time Notifications using WebSocket
Instead of repeatedly requesting notifications, the server pushes new notifications to users.
Advantage:
- Instant updates
- Fewer API requests
Tradeoff:
- More complex implementation

4. Database Indexing
Create indexes on frequently searched columns.
Advantage:
- Faster search performance
Tradeoff:
- Extra storage required
