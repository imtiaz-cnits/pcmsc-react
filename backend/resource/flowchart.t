-> Flowchart: Signup Execution Flow

+--------------------------+
|    User Submits Form     |
+-----------+--------------+
            |
            v
+--------------------------+
| Express Router (/sign-up)|
+-----------+--------------+
            |
            v
+--------------------------+
| Middleware Validation    |
| (Sanitization, Checks)   |
+-----------+--------------+
            |
            v
+--------------------------+
| Controller (SignUp)      |
| - Creates User Object   |
| - Logs Data             |
| - (Missing: Save Call)  |
+-----------+--------------+
            |
            v
+--------------------------+
|  Response Sent Back     |
| "User created" (201)    |
+--------------------------+
