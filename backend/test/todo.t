!signUp validator e -> imgURL validation need to be re-checking 

test case : 

{
  "name": "John Doe",
  "username": "john123",
  "email": "john.doe@example.com",
  "mobile": "+8801312345678",
  "password": "John@1234",
  "imgURL": "example.com/image.jpg",
  "status": "active",
  "role": "user",
  "OTP": "123456"
}


expected output should be : 

{
  "success": false,
  "message": "Invalid image URL format"
}


output : 

{
    "status": "success",
    "message": "User created successfully"
}

Explanation:

Edge Case: The imgURL should be a valid URL, but this one is not (it lacks the protocol part like http:// or https://).



work 2 : 

compare abc code part of hashing and jwt and updated with best version 