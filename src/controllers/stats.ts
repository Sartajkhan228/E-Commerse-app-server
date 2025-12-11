import type { Request, Response } from "express";


export const getDashboardStates = async (req: Request, res: Response) => {

    try {

    } catch (error) {

        console.error(error)
        res.status(400).json({
            success: false,
            message: "Error getting dashboard stats"
        })

    }
}