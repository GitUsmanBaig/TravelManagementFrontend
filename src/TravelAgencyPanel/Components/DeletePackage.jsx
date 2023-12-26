import { useEffect } from "react";
import useDeletePackage from "../Hooks/useDeletePackage";
import { toast } from "react-toastify";

const DeletePackage = Package => {
  const mutation = useDeletePackage(Package.Package._id);

  useEffect(() => {
    console.log("Delete");
    const funct = async () => {
      console.log("Delete1");
      try {
        await mutation.mutateAsync();
        console.log("Delete2");
        toast.success("Package Deleted Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });

        window.location.href = "/travel-agency/";
      } catch (error) {
        console.log("Error", error);
        toast.error("Error: Please try again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    };
    funct();
  }, []);

  return null;
};

export default DeletePackage;
