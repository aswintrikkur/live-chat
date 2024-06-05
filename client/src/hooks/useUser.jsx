import axios from "axios";

const fetchUser = async(id)=>{

try {
    const response = await axios (`${API}/api/user`,{
        method:'GET'
    })
} catch (error) {
    console.log(error);
    
}

}