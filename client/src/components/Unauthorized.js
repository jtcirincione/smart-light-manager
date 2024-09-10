import AuthenticatedHeader from "./AuthenticatedHeader"

function Unauthorized() {
    return (
        <div>
            <span className="text-2xl text-red-600">You are not authorized to view this content!</span>
        </div>
    )
}

export default Unauthorized;