






exports.processPayments = async (req, res) => {
    try {
        // Payment processing logic
        res.status(200).json({ success: true, message: "Payment processed successfully" });
    } catch (error) {
        console.error("Payment processing error:", error);
        res.status(500).json({ success: false, message: "Payment processing failed" });
    }
}