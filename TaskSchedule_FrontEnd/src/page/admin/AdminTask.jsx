import AllTaskList from "../../componant/adminComponent/AllTaskList"
import Nav from "../../componant/Nav"

const AdminTask=()=>{
    return(
        <>
           <div className="w-full h-auto background_color">
              <Nav/>
               <div className="w-full flex justify-center  h-auto">
                   <AllTaskList/>
               </div>
           </div>
        </>
    )
}

export default AdminTask