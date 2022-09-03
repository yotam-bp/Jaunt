import Loader from "react-loader-spinner";
export function LoaderCmp() {
  
    return (
      <div className="loader flex align-center justify-center">
      <Loader
      type="Puff"
      color="#FF385C"
      height={300}
      width={300}
      timeout={3000} //3 secs
      />
      </div>
    );
  
}