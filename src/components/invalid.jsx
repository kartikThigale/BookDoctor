import { Link } from "react-router-dom";

export function Invalid(){
    return(
        <div className="bg-white p-4 m-2">
            <div className="fs-1 text-danger">Invalid credential</div>
            <Link to='/login'>try again</Link>
        </div>
    )
}