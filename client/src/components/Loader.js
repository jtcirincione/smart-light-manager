import {RotatingLines} from "react-loader-spinner"

function Loader() {
  return (
    <div className="flex justify-center">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="3"
          animationDuration="1"
          width="120"
          visible={true}
        />
    </div>
  )
}

export default Loader;