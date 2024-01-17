const a =
{
    user: String,
    info: [
        {
            outlet_uuid: mongoodr.schema.objectId,
            payment:
            {
                payment_method: [
                    {
                        method: SVGStringList,
                        bankname:
                            [
                                { name: String }
                            ]
                    }
                ]
            }
        }
    ]
}



// [
                //     {
                //         outlet_uuid: "1",
                //         methods: "online",
                //         amount: 8080
                //     },
                //     {
                //         outlet_uuid: "1",
                //         methods: "online",
                //         amount: 8080
                //     },
                // ]