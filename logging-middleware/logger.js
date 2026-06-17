const axios=require("axios");
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2dHUyNDc3OEB2ZWx0ZWNoLmVkdS5pbiIsImV4cCI6MTc4MTY3NDk0MSwiaWF0IjoxNzgxNjc0MDQxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMDIwNGYzZmItYzc1OC00MmRkLTgxYmYtM2NmNjc5OTA4ZWU3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2hhaWsgc29oYWlsIGFoYW1lZCIsInN1YiI6IjliYTc4YzVmLTEyNTUtNDdjMC1iYTZhLTY1MGE0ZjBlMjIyYSJ9LCJlbWFpbCI6InZ0dTI0Nzc4QHZlbHRlY2guZWR1LmluIiwibmFtZSI6InNoYWlrIHNvaGFpbCBhaGFtZWQiLCJyb2xsTm8iOiJ2dHUyNDc3OCIsImFjY2Vzc0NvZGUiOiJqdUZwaHYiLCJjbGllbnRJRCI6IjliYTc4YzVmLTEyNTUtNDdjMC1iYTZhLTY1MGE0ZjBlMjIyYSIsImNsaWVudFNlY3JldCI6IllIYkVSWFRnQ1V4a3p1RGQifQ.dFOXRUJ38LvZ4YqC-1uAqhC80ccekTQLXstCp6UhojU";
async function Log(stack,level,packageName,message){
  try{
    const response=await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package:packageName,
        message
      },
      {
        headers:{
          Authorization:`Bearer ${TOKEN}`
        }
      }
    );
    console.log(response.data);
  }catch(error){
    console.error(error.response?.data || error.message);
  }
}
module.exports=Log;