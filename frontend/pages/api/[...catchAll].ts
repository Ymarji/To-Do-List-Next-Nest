
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { Backend } from "../../src/main";

export default (req: NextApiRequest, res: NextApiResponse) => new Promise(async resolve => {
    const listener = await Backend.getListener();
    listener(req, res);
    res.on("finish", resolve);
})