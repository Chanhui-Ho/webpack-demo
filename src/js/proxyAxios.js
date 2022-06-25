import axios from "axios";

axios.get("/api/users").then((res)=>{
    console.log(res.data);
});