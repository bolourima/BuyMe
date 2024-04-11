import { instance } from "@/instance";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
const index = ({
  admins,
}: {
  admins: {
    _id: string;
    shopName: string;
  }[];
}) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    const decoded: { subAdmin: boolean } = jwtDecode(token);
    if (decoded.subAdmin) {
      router.push("/");
      return;
    }
  }, []);
  return (
    <div className="container mx-auto p-4 flex flex-col w-full">
      <h1 className="text-2xl font-bold mb-4">Admin Shops</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {admins.map((admin) => (
          <button
            onClick={() => router.push(router.asPath + "/" + admin._id)}
            key={admin._id}
            className="bg-white shadow-md rounded-md p-4"
          >
            <h2 className="text-lg font-semibold mb-2">{admin.shopName}</h2>
            <p className="text-gray-500">Admin ID: {admin._id}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
export default index;
export const getServerSideProps = async () => {
  const res = await instance.post("/getAllAdmins", { subAdmin: true });
  const admins = res.data;
  return {
    props: { admins },
  };
};
