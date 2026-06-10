import { BarLoader } from "react-spinners";

function LoadingScreen() {
  return (
    <>
      <div className="loadingDiv">
        <BarLoader className="barLoader" width={"100%"} color={"#7F77DD"} />
      </div>
    </>
  );
}
export default LoadingScreen;
