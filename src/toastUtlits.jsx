import {Slide, toast} from  "react-toastify"

export const ToastSuccess = (message)=>{
toast.success(message || "Success" ,
    {
        position:"top-right",
        autoClose :3000,
        theme:"colored",
        transition:Slide
    }
)

}
export const ToastError=(message)=>{
    toast.error(message || "Error",{
        position:"bottom-right",
        autoClose:3000,
        theme:"colored",
        transition:Slide
    })
}