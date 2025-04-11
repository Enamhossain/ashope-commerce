import React, { useEffect, useState } from "react";

import { Pencil, Trash2, Check, X } from "lucide-react";
import api from "../../../../../utils/api";
import { useToast } from "@chakra-ui/react";

function BannerList() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", image: "" });
  const toast = useToast();
  // Fetch Banners
  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await api.get("/banners");
        setBanners(res.data);
      } catch (err) {
        console.error("Error fetching banners:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBanners();
  }, []);

// Handle Delete
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this banner?")) return;

  try {
    await api.delete(`/banners/${id}`);

    setBanners((prevBanners) => prevBanners.filter((banner) => banner._id !== id));

    toast({
      title: "Banner Deleted",
      description: "The banner has been successfully deleted.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });

    // Refresh the page after a short delay
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (err) {
    console.error("Error deleting banner:", err);

    toast({
      title: "Error",
      description: "Failed to delete the banner.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }
};

  // Handle Edit Click
  const handleEditClick = (banner) => {
    setEditId(banner._id);
    setEditData({ title: banner.title, image: banner.image });
  };

  // Handle Input Change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Handle Save Edit
  const handleSave = async () => {
    try {
      const res = await api.patch(`/banners/${editId}`, editData);
      setBanners(
        banners.map((banner) => (banner._id === editId ? res.data : banner))
      );
      setEditId(null);
    } catch (err) {
      console.error("Error updating banner:", err);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Banner List</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Subtitle</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr key={banner._id} className="border-b">
                <td className="p-3">
                  {editId === banner._id ? (
                    <input
                      type="text"
                      name="image"
                      value={editData.image}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  ) : (
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="p-2">
                  {editId === banner._id ? (
                    <input
                      type="text"
                      name="title"
                      value={editData.title}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  ) : (
                    banner.title
                  )}
                </td>
                <td className="p-3">
                  {editId === banner._id ? (
                    <input
                      type="text"
                      name="Subtitle"
                      value={editData.subtitle}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  ) : (
                    banner.subtitle
                  )}
                </td>
                <td className="p-3">
                  {editId === banner._id ? (
                    <>
                      <button
                        className="text-green-500 hover:text-green-700 mr-2"
                        onClick={handleSave}
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setEditId(null)}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-3"
                        onClick={() => handleEditClick(banner)}
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(banner._id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BannerList;
