"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/Select"
import { TextInput } from "@repo/ui/TextInput"
import { useState } from "react"
import { createOnrampTransaction } from "../app/lib/actions/createOnrampTransaction"

const SUPPORTED_BANKS = [{
        name: "HDFC Bank",
        redirectURL: "https://netbanking.hdfcbank.com"
    },{
        name: "Axis Bank",
        redirectURL: "https://www.axisbank.com/"
    }]

export const AddMoney = ()  => {
    const [redirectURL, setRedirectURL] = useState(SUPPORTED_BANKS[0]?.redirectURL)
    const [value,setValue] = useState(0)
    const [provider,setProvider] = useState(SUPPORTED_BANKS[0]?.name || "")

    return <Card title="Add Money">
        <div className="w-full">
            <TextInput label="Amount" placeholder="Amount" onChange={(val)=>{
                setValue(Number(val)*100)
            }} />
            <div className="py-4 text-left">
                Bank
            </div>
            <Select 
                onSelect={(value)=> {
                    setRedirectURL(SUPPORTED_BANKS.find(x => x.name===value)?.redirectURL || "")
                    setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
                }}
                options={SUPPORTED_BANKS.map(x => ({
                    key: x.name,
                    value: x.name
                }))}
            />
            <div className="flex justify-center pt-4">
                <Button onClick={async()=>{
                    await createOnrampTransaction(value,provider)
                    window.location.href = redirectURL || ""
                }}>
                    Add Money
                </Button>
            </div>
        </div>
    </Card>
}