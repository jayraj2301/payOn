import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client"
import { OnRampTransactions } from "../../../components/OnRampTransactions"

async function getOnRampTransactions(status:"Failure" | "Processing" | "Success") {
    const session = await getServerSession(authOptions)
    const txns = await prisma.onRampTransaction.findMany({
        where:{
            userId: Number(session?.user?.id),
            status
        }
    })

    return txns.map(t=>({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: String(t.provider)
    }))
}

async function getSentP2PTxns() {
    const session = await getServerSession(authOptions)
    const txns = await prisma.p2pTransfer.findMany({
        where:{
            fromUserId: Number(session?.user?.id)
        }
    })

    return txns.map(t=>({
        time: t.timestamp,
        amount: t.amount,
        status: "Success",
        provider: String(t.fromUserId)
    }))
}

async function getReceiveP2PTxns() {
    const session = await getServerSession(authOptions)
    const txns = await prisma.p2pTransfer.findMany({
        where:{
            toUserId: Number(session?.user?.id)
        }
    })

    return txns.map(t=>({
        time: t.timestamp,
        amount: t.amount,
        status: "Success",
        provider: String(t.fromUserId)
    }))
}

export default async function() {

    const onRampTxns = await getOnRampTransactions("Success")
    const sentP2pTxns = await getSentP2PTxns()
    const recP2pTxns = await getReceiveP2PTxns()

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transactions
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <OnRampTransactions title={"P2P Sent Transactions"} transactions={sentP2pTxns} />
            <OnRampTransactions title={"P2P Receive Transactions"} transactions={recP2pTxns} />
            <OnRampTransactions title={"On Ramp Transactions"} transactions={onRampTxns} />

        </div>
    </div>
}