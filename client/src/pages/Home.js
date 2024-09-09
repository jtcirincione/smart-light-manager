import AuthenticatedHeader from "../components/AuthenticatedHeader";

function Home() {
    const turnOff = async () => {
        const response = await fetch("/server/lights/off")
        if (response.status !== 200) {
            alert("Nice try but you really think I'd let anyone mess with my lights?")
        }
    };

    const turnOn = async () => {
        const response = await fetch("/server/lights/on")
        if (response.status !== 200) {
            alert("Nice try but you really think I'd let anyone mess with my lights?")
        }
    };

    return (
        <AuthenticatedHeader>
            <div>
                <div className="flex justify-center">
                    <button className="mt-10 mx-4 mb-8 border py-1 px-24 rounded-md border-black bg-green-300" onClick={turnOn}>
                        on
                    </button>
                    <button className="mt-10 mx-4 mb-8 border py-1 px-24 rounded-md border-black bg-green-300" onClick={turnOff}>
                        off
                    </button>
                </div>
            </div>
        </AuthenticatedHeader>
    );
}

export default Home;