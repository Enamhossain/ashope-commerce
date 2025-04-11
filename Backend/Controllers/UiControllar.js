import bannersCollection from "../models/UserInterface.js"; // Ensure the model is correct
import { ObjectId } from "mongodb";
// Get active banners
export const bannersGet = async (req, res) => {
  try {
    const banners = await bannersCollection
      .find({ active: true })
      .sort({ order: 1 })
      .toArray();
    res.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({ error: "Error fetching banners" });
  }
};

// Add a new banner
export const bannerPost = async (req, res) => {
  const { title, subtitle, image, link, order } = req.body;
  try {
    const newBanner = {
      title,
      subtitle,
      image,
      link,
      order,
      active: true,
    };

    const result = await bannersCollection.insertOne(newBanner);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding banner:", error);
    res.status(500).json({ error: "Error adding banner" });
  }
};

export const bannerEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    // Ensure a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid banner ID" });
    }

    // Update the banner
    const result = await bannersCollection.findOneAndUpdate(
      { _id: new ObjectId(id) }, // Find the document by ID
      { $set: updateData }, // Update with new data
      { returnDocument: "after" } // Return the updated document
    );

    if (!result.value) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res
      .status(200)
      .json({
        message: "Banner updated successfully",
        updatedBanner: result.value,
      });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const bannerDelete = async (req, res) => {
  try {
    const { id } = req.params;
    // Ensure a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid banner ID" });
    }

    // Delete the banner
    const result = await bannersCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });

    if (!result.value) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting banner:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}