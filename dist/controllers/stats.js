export const getDashboardStates = async (req, res) => {
    try {
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error getting dashboard stats"
        });
    }
};
//# sourceMappingURL=stats.js.map