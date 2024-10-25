import ClipLoader from "react-spinners/ClipLoader";

const Loading = ({ color }) => {
  return (
    <div>
      <ClipLoader loading={true} size={25} />
    </div>
  );
};

export default Loading;
