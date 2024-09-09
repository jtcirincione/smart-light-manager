import AuthenticatedHeader from "./AuthenticatedHeader"

function Unauthorized() {
    return (
        <div>
            <h1>400</h1>
            <span>You are not authorized to view this content</span>
        </div>
    )
}

export default Unauthorized;