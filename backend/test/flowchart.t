#### Visualization of File Upload Flow:


+-----------+        +------------------+        +----------------------+
|  User     | -----> | Express Server   | -----> | Multer Middleware     |
| Uploads   | POST   | (Route Handling)  |        | (Process File)        |
| File      |        | /api/files/upload|        | (Validate & Store)    |
+-----------+        +------------------+        +----------------------+
                                           |
                                           v
                                +------------------+
                                | File Stored in   |
                                | 'uploads/' folder|
                                +------------------+
                                           |
                                           v
                                +----------------------+
                                | Response with file   |
                                | details (JSON)       |
                                +----------------------+





###  Multer functionality flowchart


+------------------+        +-------------------+        +---------------------------+
|   User          | -----> | Express Server    | -----> | Multer Middleware          |
|   Uploads File  | POST   | (Route Handling)   |        | (Process File, Validate)   |
|   (via Form)    |        | /api/files/upload |        |                             |
+------------------+        +-------------------+        +---------------------------+
                                      |
                                      v
                          +---------------------------+
                          | File Validated & Processed |
                          | (Check Type, Size, etc.)   |
                          +---------------------------+
                                      |
                                      v
                          +---------------------------+
                          | File Saved to 'uploads/'   |
                          | Folder (Disk Storage)      |
                          +---------------------------+
                                      |
                                      v
                          +---------------------------+
                          | File Metadata Stored in    |
                          | req.file (name, size, path)|
                          +---------------------------+
                                      |
                                      v
                          +---------------------------+
                          | Response Sent to User      |
                          | (File Details as JSON)     |
                          +---------------------------+





expected JSON data will be 

{
  "message": "File uploaded successfully",
  "file": {
    "fieldname": "file",
    "originalname": "image.jpg",
    "encoding": "7bit",
    "mimetype": "image/jpeg",
    "destination": "./uploads/",
    "filename": "1634165378649.jpg",
    "path": "uploads/1634165378649.jpg",
    "size": 102400
  }
}


